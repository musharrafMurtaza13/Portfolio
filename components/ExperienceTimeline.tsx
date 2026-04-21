'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { motion } from 'framer-motion'

const ExperienceTimeline = () => {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const data = [
      { year: '2018', company: 'KCompute Pvt. Ltd', role: 'Software Engineer', impact: 60, achievements: 2 },
      { year: '2019', company: 'KCompute Pvt. Ltd', role: 'Senior Software Engineer', impact: 75, achievements: 5 },
      { year: '2020', company: 'KCompute Pvt. Ltd', role: 'Technical Lead', impact: 85, achievements: 8 },
      { year: '2021', company: 'KCompute Pvt. Ltd', role: 'Technical Lead', impact: 88, achievements: 10 },
      { year: '2022', company: 'KCompute Pvt. Ltd', role: 'Senior Tech Lead', impact: 92, achievements: 12 },
      { year: '2023', company: 'KCompute Pvt. Ltd', role: 'Senior Tech Lead', impact: 94, achievements: 15 },
      { year: '2024', company: 'EpicMetry', role: 'Senior Software Engineer', impact: 96, achievements: 18 }
    ]

    const width = 900
    const height = 450
    const margin = { top: 60, right: 40, bottom: 60, left: 70 }

    // Clear previous content
    d3.select(svgRef.current).selectAll('*').remove()

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    const x = d3.scaleBand()
      .domain(data.map(d => d.year))
      .range([0, width - margin.left - margin.right])
      .padding(0.3)

    const y = d3.scaleLinear()
      .domain([0, 100])
      .range([height - margin.top - margin.bottom, 0])

    // Add gradient for bars
    const gradient = svg.append('defs')
      .append('linearGradient')
      .attr('id', 'bar-gradient')
      .attr('gradientTransform', 'rotate(90)')
    
    gradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#3b82f6')
    
    gradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#8b5cf6')

    // Add grid lines
    svg.selectAll('line.grid-line')
      .data(y.ticks(5))
      .enter()
      .append('line')
      .attr('x1', 0)
      .attr('x2', width - margin.left - margin.right)
      .attr('y1', d => y(d))
      .attr('y2', d => y(d))
      .attr('stroke', '#e2e8f0')
      .attr('stroke-dasharray', '4,4')
      .attr('opacity', 0.3)

    // Add bars with animation
    svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', d => x(d.year) || 0)
      .attr('y', height - margin.top - margin.bottom)
      .attr('width', x.bandwidth())
      .attr('height', 0)
      .attr('fill', 'url(#bar-gradient)')
      .attr('rx', 8)
      .attr('ry', 8)
      .attr('cursor', 'pointer')
      .on('mouseover', function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('width', x.bandwidth() * 1.1)
          .attr('x', (x(d.year) || 0) - x.bandwidth() * 0.05)
          .attr('opacity', 0.9)
        
        // Show tooltip
        const tooltip = svg.append('g')
          .attr('class', 'tooltip-group')
          .attr('transform', `translate(${(x(d.year) || 0) + x.bandwidth() / 2}, ${y(d.impact) - 15})`)
        
        tooltip.append('rect')
          .attr('x', -60)
          .attr('y', -35)
          .attr('width', 120)
          .attr('height', 45)
          .attr('rx', 6)
          .attr('fill', 'white')
          .attr('stroke', '#3b82f6')
          .attr('stroke-width', 2)
          .attr('opacity', 0.95)
        
        tooltip.append('text')
          .attr('x', 0)
          .attr('y', -18)
          .attr('text-anchor', 'middle')
          .style('font-size', '11px')
          .style('font-weight', 'bold')
          .style('fill', '#1f2937')
          .text(`${d.role}`)
        
        tooltip.append('text')
          .attr('x', 0)
          .attr('y', -3)
          .attr('text-anchor', 'middle')
          .style('font-size', '10px')
          .style('fill', '#6b7280')
          .text(`Impact: ${d.impact}%`)
        
        tooltip.append('text')
          .attr('x', 0)
          .attr('y', 12)
          .attr('text-anchor', 'middle')
          .style('font-size', '10px')
          .style('fill', '#6b7280')
          .text(`Achievements: ${d.achievements}+`)
      })
      .on('mouseout', function() {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('width', x.bandwidth())
          .attr('x', x((d3.select(this).datum() as any).year) || 0)
          .attr('opacity', 0.8)
        
        svg.selectAll('.tooltip-group').remove()
      })
      .transition()
      .duration(1000)
      .delay((d, i) => i * 150)
      .attr('y', d => y(d.impact))
      .attr('height', d => height - margin.top - margin.bottom - y(d.impact))

    // Add impact value labels
    svg.selectAll('text.value')
      .data(data)
      .enter()
      .append('text')
      .attr('x', d => (x(d.year) || 0) + x.bandwidth() / 2)
      .attr('y', d => y(d.impact) - 8)
      .attr('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('font-weight', 'bold')
      .style('fill', '#3b82f6')
      .style('opacity', 0)
      .text(d => `${d.impact}%`)
      .transition()
      .delay((d, i) => i * 150 + 800)
      .style('opacity', 1)

    // Add achievement dots above bars
    data.forEach((d, i) => {
      const barX = (x(d.year) || 0) + x.bandwidth() / 2
      const barTop = y(d.impact)
      
      // Add a small star/circle for achievements
      svg.append('circle')
        .attr('cx', barX)
        .attr('cy', barTop - 15)
        .attr('r', 0)
        .attr('fill', '#f59e0b')
        .attr('stroke', 'white')
        .attr('stroke-width', 2)
        .transition()
        .delay(i * 150 + 1000)
        .duration(300)
        .attr('r', 5)
      
      // Add connecting line from bar top to achievement dot
      svg.append('line')
        .attr('x1', barX)
        .attr('y1', barTop)
        .attr('x2', barX)
        .attr('y2', barTop - 5)
        .attr('stroke', '#f59e0b')
        .attr('stroke-width', 2)
        .attr('stroke-dasharray', '3,3')
        .attr('opacity', 0)
        .transition()
        .delay(i * 150 + 900)
        .attr('opacity', 1)
    })

    // Add x-axis
    svg.append('g')
      .attr('transform', `translate(0, ${height - margin.top - margin.bottom})`)
      .call(d3.axisBottom(x))
      .style('font-size', '12px')
      .style('font-weight', '500')

    // Add y-axis
    svg.append('g')
      .call(d3.axisLeft(y).ticks(5))
      .style('font-size', '12px')

    // Add axis labels
    svg.append('text')
      .attr('x', (width - margin.left - margin.right) / 2)
      .attr('y', height - margin.top - margin.bottom + 40)
      .attr('text-anchor', 'middle')
      .style('font-size', '14px')
      .style('fill', '#6b7280')
      .text('Year')

    svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -(height - margin.top - margin.bottom) / 2)
      .attr('y', -45)
      .attr('text-anchor', 'middle')
      .style('font-size', '14px')
      .style('fill', '#6b7280')
      .text('Impact Score (%)')

    // Add title
    svg.append('text')
      .attr('x', (width - margin.left - margin.right) / 2)
      .attr('y', -25)
      .attr('text-anchor', 'middle')
      .style('font-size', '18px')
      .style('font-weight', 'bold')
      .style('fill', '#3b82f6')
      .text('Career Growth & Impact Timeline')

    // Add subtitle
    svg.append('text')
      .attr('x', (width - margin.left - margin.right) / 2)
      .attr('y', -8)
      .attr('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('fill', '#9ca3af')
      .text('Professional journey with key achievements and impact metrics')

    // Add a subtle background line connecting the tops of bars
    const lineData = data.map(d => ({
      x: (x(d.year) || 0) + x.bandwidth() / 2,
      y: y(d.impact)
    }))

    const line = d3.line<{ x: number; y: number }>()
      .x(d => d.x)
      .y(d => d.y)
      .curve(d3.curveMonotoneX)

    svg.append('path')
      .datum(lineData)
      .attr('fill', 'none')
      .attr('stroke', '#8b5cf6')
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', '5,5')
      .attr('opacity', 0)
      .attr('d', line)
      .transition()
      .delay(1200)
      .duration(800)
      .attr('opacity', 0.5)

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

export default ExperienceTimeline