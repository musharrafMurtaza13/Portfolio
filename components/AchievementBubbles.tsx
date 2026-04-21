'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { motion } from 'framer-motion'

interface BubbleData {
  name: string
  value: number
  category: string
  x?: number
  y?: number
  fx?: number | null
  fy?: number | null
}

const AchievementBubbles = () => {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const data: BubbleData[] = [
      { name: 'Angular Migration', value: 40, category: 'Performance' },
      { name: 'DB Optimization', value: 30, category: 'Performance' },
      { name: 'UI Library', value: 20, category: 'Efficiency' },
      { name: 'User Engagement', value: 50, category: 'Engagement' },
      { name: 'Bug Reduction', value: 70, category: 'Quality' },
      { name: 'Team Productivity', value: 35, category: 'Leadership' },
      { name: 'Feature Delivery', value: 25, category: 'Efficiency' },
      { name: 'Code Quality', value: 45, category: 'Quality' },
      { name: 'Documentation', value: 15, category: 'Quality' },
      { name: 'Code Review', value: 28, category: 'Leadership' }
    ]

    const width = 900
    const height = 550

    // Clear previous content
    d3.select(svgRef.current).selectAll('*').remove()

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .style('background', 'transparent')

    // Color scale for categories
    const colorScale = d3.scaleOrdinal<string>()
      .domain(['Performance', 'Efficiency', 'Engagement', 'Quality', 'Leadership'])
      .range(['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'])

    // Create force simulation
    const simulation = d3.forceSimulation<BubbleData>(data)
      .force('charge', d3.forceManyBody().strength(80))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide<BubbleData>().radius((d) => (d.value / 2) + 15))
      .force('x', d3.forceX(width / 2).strength(0.05))
      .force('y', d3.forceY(height / 2).strength(0.05))

    // Create container for bubbles
    const node = svg.selectAll('g')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'bubble-group')
      .call(d3.drag<SVGGElement, BubbleData>()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended) as any)

    // Add circles with animation
    node.each(function(d) {
      const circle = d3.select(this)
        .append('circle')
        .attr('r', 0)
        .attr('fill', colorScale(d.category))
        .attr('stroke', 'white')
        .attr('stroke-width', 2)
        .attr('opacity', 0.85)
        .attr('cursor', 'pointer')
      
      // Animate radius
      circle.transition()
        .duration(1000)
        .delay(Math.random() * 500)
        .attr('r', d.value + 10)
      
      // Add hover effects
      circle.on('mouseover', function() {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('r', (d.value + 10) * 1.1)
          .attr('opacity', 1)
        
        // Show tooltip
        const tooltip = svg.append('g')
          .attr('class', 'tooltip-' + d.name.replace(/\s/g, ''))
        
        tooltip.append('rect')
          .attr('x', -50)
          .attr('y', -35)
          .attr('width', 100)
          .attr('height', 30)
          .attr('rx', 5)
          .attr('fill', '#1f2937')
          .attr('opacity', 0.95)
        
        tooltip.append('text')
          .attr('x', 0)
          .attr('y', -16)
          .attr('text-anchor', 'middle')
          .style('font-size', '11px')
          .style('fill', 'white')
          .style('font-weight', 'bold')
          .text(d.name)
        
        tooltip.append('text')
          .attr('x', 0)
          .attr('y', -3)
          .attr('text-anchor', 'middle')
          .style('font-size', '10px')
          .style('fill', '#93c5fd')
          .text(`${d.value}% improvement`)
        
        // Position tooltip near the bubble
        const currentPos = d3.select(this.parentNode as any).attr('transform')
        if (currentPos) {
          const match = currentPos.match(/translate\(([^,]+),([^)]+)\)/)
          if (match) {
            const x = parseFloat(match[1])
            const y = parseFloat(match[2])
            tooltip.attr('transform', `translate(${x}, ${y - (d.value + 20)})`)
          }
        }
      })
      
      circle.on('mouseout', function() {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('r', d.value + 10)
          .attr('opacity', 0.85)
        
        svg.selectAll('.tooltip-' + d.name.replace(/\s/g, '')).remove()
      })
    })

    // Add text labels inside bubbles
    node.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '.3em')
      .attr('fill', 'white')
      .style('font-size', '0px')
      .style('font-weight', 'bold')
      .style('pointer-events', 'none')
      .text(d => {
        const words = d.name.split(' ')
        if (words.length > 2) {
          return `${words[0]} ${words[1]}`
        }
        return d.name
      })
      .transition()
      .duration(1000)
      .delay(800)
      .style('font-size', d => {
        const size = Math.max(10, Math.min(d.value / 4, 14))
        return `${size}px`
      })

    // Add percentage labels
    node.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '1.5em')
      .attr('fill', 'rgba(255,255,255,0.8)')
      .style('font-size', '0px')
      .style('pointer-events', 'none')
      .text(d => `${d.value}%`)
      .transition()
      .duration(1000)
      .delay(1000)
      .style('font-size', d => {
        const size = Math.max(8, Math.min(d.value / 5, 11))
        return `${size}px`
      })

    // Update positions on tick
    simulation.on('tick', () => {
      node.attr('transform', (d) => {
        const x = Math.max(30, Math.min(width - 30, d.x || width / 2))
        const y = Math.max(30, Math.min(height - 30, d.y || height / 2))
        return `translate(${x}, ${y})`
      })
    })

    // Drag functions
    function dragstarted(event: any, d: BubbleData) {
      if (!event.active) simulation.alphaTarget(0.3).restart()
      d.fx = d.x
      d.fy = d.y
    }

    function dragged(event: any, d: BubbleData) {
      d.fx = event.x
      d.fy = event.y
    }

    function dragended(event: any, d: BubbleData) {
      if (!event.active) simulation.alphaTarget(0)
      d.fx = null
      d.fy = null
    }

    // Add title
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', 30)
      .attr('text-anchor', 'middle')
      .style('font-size', '20px')
      .style('font-weight', 'bold')
      .style('fill', '#3b82f6')
      .text('Achievement Bubbles')

    // Add subtitle
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', 50)
      .attr('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('fill', '#9ca3af')
      .text('Size represents impact percentage - Drag bubbles to explore')

    // Add legend
    const legend = svg.append('g')
      .attr('transform', `translate(20, 80)`)
    
    const categories = ['Performance', 'Efficiency', 'Engagement', 'Quality', 'Leadership']
    categories.forEach((cat, i) => {
      const legendItem = legend.append('g')
        .attr('transform', `translate(0, ${i * 25})`)
        .attr('cursor', 'pointer')
      
      legendItem.append('circle')
        .attr('cx', 8)
        .attr('cy', 8)
        .attr('r', 6)
        .attr('fill', colorScale(cat))
        .attr('stroke', 'white')
        .attr('stroke-width', 1)
      
      legendItem.append('text')
        .attr('x', 20)
        .attr('y', 12)
        .style('font-size', '11px')
        .style('fill', '#6b7280')
        .text(cat)
      
      // Add hover effect to legend
      legendItem.on('mouseover', function() {
        d3.select(this).select('text')
          .transition()
          .duration(200)
          .style('fill', colorScale(cat))
          .style('font-weight', 'bold')
        
        // Highlight bubbles of this category
        node.filter((d: any) => d.category === cat)
          .select('circle')
          .transition()
          .duration(200)
          .attr('stroke', '#000')
          .attr('stroke-width', 3)
      })
      
      legendItem.on('mouseout', function() {
        d3.select(this).select('text')
          .transition()
          .duration(200)
          .style('fill', '#6b7280')
          .style('font-weight', 'normal')
        
        node.filter((d: any) => d.category === cat)
          .select('circle')
          .transition()
          .duration(200)
          .attr('stroke', 'white')
          .attr('stroke-width', 2)
      })
    })

    // Add instructions text
    svg.append('text')
      .attr('x', width - 20)
      .attr('y', height - 10)
      .attr('text-anchor', 'end')
      .style('font-size', '10px')
      .style('fill', '#9ca3af')
      .style('font-style', 'italic')
      .text('💡 Drag bubbles to rearrange')

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
        style={{ minWidth: '700px', maxWidth: '100%', height: 'auto', minHeight: '550px' }}
      />
    </motion.div>
  )
}

export default AchievementBubbles