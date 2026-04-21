'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { motion } from 'framer-motion'

const PerformanceMetrics = () => {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const data = [
      { metric: 'Code Performance', before: 65, after: 92, improvement: 27 },
      { metric: 'Bug Rate (%)', before: 45, after: 15, improvement: -30 },
      { metric: 'Dev Speed', before: 60, after: 85, improvement: 25 },
      { metric: 'Code Quality', before: 70, after: 88, improvement: 18 },
      { metric: 'Team Output', before: 55, after: 82, improvement: 27 }
    ]

    const width = 900
    const height = 450
    const margin = { top: 60, right: 100, bottom: 60, left: 120 }

    d3.select(svgRef.current).selectAll('*').remove()

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    const x = d3.scaleLinear()
      .domain([0, 100])
      .range([0, width - margin.left - margin.right])

    const y = d3.scaleBand()
      .domain(data.map(d => d.metric))
      .range([0, height - margin.top - margin.bottom])
      .padding(0.4)

    // Add gradient for after bars
    const gradient = svg.append('defs')
      .append('linearGradient')
      .attr('id', 'after-gradient')
      .attr('gradientTransform', 'rotate(90)')
    
    gradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#3b82f6')
    
    gradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#8b5cf6')

    // Add before bars
    svg.selectAll('rect.before')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', 0)
      .attr('y', d => y(d.metric) || 0)
      .attr('width', 0)
      .attr('height', y.bandwidth())
      .attr('fill', '#cbd5e1')
      .attr('rx', 6)
      .attr('ry', 6)
      .transition()
      .duration(800)
      .attr('width', d => x(d.before))

    // Add after bars with animation
    svg.selectAll('rect.after')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', 0)
      .attr('y', d => y(d.metric) || 0)
      .attr('width', 0)
      .attr('height', y.bandwidth())
      .attr('fill', 'url(#after-gradient)')
      .attr('rx', 6)
      .attr('ry', 6)
      .attr('cursor', 'pointer')
      .on('mouseover', function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('opacity', 0.8)
          .attr('width', x(d.after) + 5)
      })
      .on('mouseout', function() {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('opacity', 1)
          .attr('width', d => x((d as any).after))
      })
      .transition()
      .delay(800)
      .duration(1000)
      .attr('width', d => x(d.after))

    // Add before labels
    svg.selectAll('text.before-label')
      .data(data)
      .enter()
      .append('text')
      .attr('x', d => x(d.before) - 35)
      .attr('y', d => (y(d.metric) || 0) + y.bandwidth() / 2)
      .attr('dy', '.35em')
      .style('font-size', '12px')
      .style('fill', '#64748b')
      .style('opacity', 0)
      .text(d => `${d.before}%`)
      .transition()
      .delay(800)
      .style('opacity', 1)

    // Add after labels
    svg.selectAll('text.after-label')
      .data(data)
      .enter()
      .append('text')
      .attr('x', d => x(d.after) + 8)
      .attr('y', d => (y(d.metric) || 0) + y.bandwidth() / 2)
      .attr('dy', '.35em')
      .style('font-size', '13px')
      .style('font-weight', 'bold')
      .style('fill', '#3b82f6')
      .style('opacity', 0)
      .text(d => `${d.after}%`)
      .transition()
      .delay(1800)
      .style('opacity', 1)

    // Add improvement indicators
    data.forEach((d, i) => {
      const improvement = d.improvement
      const isPositive = improvement > 0
      const barCenter = (x(d.before) + x(d.after)) / 2
      const barTop = (y(d.metric) || 0) - 12
      
      // Add arrow and percentage
      const improvementGroup = svg.append('g')
        .attr('class', 'improvement-group')
        .attr('transform', `translate(${barCenter}, ${barTop})`)
        .style('opacity', 0)
      
      improvementGroup.append('text')
        .attr('x', 0)
        .attr('y', 0)
        .attr('text-anchor', 'middle')
        .style('font-size', '16px')
        .style('fill', isPositive ? '#10b981' : '#ef4444')
        .text(isPositive ? '↑' : '↓')
      
      improvementGroup.append('text')
        .attr('x', 15)
        .attr('y', 4)
        .attr('text-anchor', 'start')
        .style('font-size', '11px')
        .style('font-weight', 'bold')
        .style('fill', isPositive ? '#10b981' : '#ef4444')
        .text(`${Math.abs(improvement)}%`)
      
      improvementGroup.transition()
        .delay(2000 + i * 100)
        .duration(500)
        .style('opacity', 1)
    })

    // Add y-axis
    svg.append('g')
      .call(d3.axisLeft(y))
      .style('font-size', '12px')
      .style('font-weight', '500')

    // Add x-axis
    svg.append('g')
      .attr('transform', `translate(0, ${height - margin.top - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(5))
      .style('font-size', '12px')

    // Add x-axis label
    svg.append('text')
      .attr('x', (width - margin.left - margin.right) / 2)
      .attr('y', height - margin.top - margin.bottom + 35)
      .attr('text-anchor', 'middle')
      .style('font-size', '13px')
      .style('fill', '#6b7280')
      .text('Performance Score (%)')

    // Add title
    svg.append('text')
      .attr('x', (width - margin.left - margin.right) / 2)
      .attr('y', -30)
      .attr('text-anchor', 'middle')
      .style('font-size', '18px')
      .style('font-weight', 'bold')
      .style('fill', '#3b82f6')
      .text('Performance Metrics: Before vs After')

    // Add subtitle
    svg.append('text')
      .attr('x', (width - margin.left - margin.right) / 2)
      .attr('y', -12)
      .attr('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('fill', '#9ca3af')
      .text('Improvement metrics after implementing optimizations and leading teams')

    // Add legend
    const legend = svg.append('g')
      .attr('transform', `translate(${width - margin.left - margin.right - 150}, -40)`)
    
    legend.append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', 12)
      .attr('height', 12)
      .attr('fill', '#cbd5e1')
      .attr('rx', 2)
    
    legend.append('text')
      .attr('x', 18)
      .attr('y', 10)
      .style('font-size', '11px')
      .style('fill', '#64748b')
      .text('Before')
    
    legend.append('rect')
      .attr('x', 80)
      .attr('y', 0)
      .attr('width', 12)
      .attr('height', 12)
      .attr('fill', '#3b82f6')
      .attr('rx', 2)
    
    legend.append('text')
      .attr('x', 98)
      .attr('y', 10)
      .style('font-size', '11px')
      .style('fill', '#3b82f6')
      .style('font-weight', 'bold')
      .text('After')

  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex justify-center items-center p-4 overflow-x-auto"
    >
      <svg 
        ref={svgRef} 
        className="w-full h-auto" 
        style={{ minWidth: '700px', maxWidth: '100%' }}
      />
    </motion.div>
  )
}

export default PerformanceMetrics