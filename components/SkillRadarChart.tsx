'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { motion } from 'framer-motion'

interface SkillData {
  skill: string
  value: number
  category: string
}

const SkillRadarChart = () => {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    // Your actual skills with proper names and values based on your CV
    const data: SkillData[] = [
      { skill: '.NET Core', value: 95, category: 'Backend' },
      { skill: 'Angular', value: 90, category: 'Frontend' },
      { skill: 'React', value: 85, category: 'Frontend' },
      { skill: 'TypeScript', value: 92, category: 'Frontend' },
      { skill: 'SQL Server', value: 88, category: 'Database' },
      { skill: 'Node.js', value: 80, category: 'Backend' },
      { skill: 'Entity Framework', value: 87, category: 'Backend' },
      { skill: 'Microservices', value: 82, category: 'Architecture' },
      { skill: 'CI/CD', value: 78, category: 'DevOps' },
      { skill: 'GraphQL', value: 75, category: 'Backend' }
    ]

    const width = 700
    const height = 650
    const radius = Math.min(width, height) / 2.3
    const centerX = width / 2
    const centerY = height / 2

    // Clear previous content
    d3.select(svgRef.current).selectAll('*').remove()

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${centerX},${centerY})`)

    const angleSlice = Math.PI * 2 / data.length
    const scale = d3.scaleLinear()
      .domain([0, 100])
      .range([0, radius])

    // Draw background circles with value labels
    const levels = 5
    for (let level = 1; level <= levels; level++) {
      const r = radius * (level / levels)
      
      svg.append('circle')
        .attr('r', r)
        .attr('fill', 'none')
        .attr('stroke', '#e2e8f0')
        .attr('stroke-width', 1)
        .attr('stroke-dasharray', '4,4')
        .attr('opacity', 0.5)
      
      // Add value labels on the left side
      if (level > 0) {
        const value = (level / levels) * 100
        svg.append('text')
          .attr('x', -radius - 10)
          .attr('y', -r)
          .attr('text-anchor', 'middle')
          .style('font-size', '10px')
          .style('fill', '#94a3b8')
          .text(`${Math.round(value)}`)
      }
    }

    // Draw axes and labels with better positioning
    data.forEach((d, i) => {
      const angle = i * angleSlice - Math.PI / 2
      const x = radius * Math.cos(angle)
      const yAxis = radius * Math.sin(angle)

      // Draw axis line
      svg.append('line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', x)
        .attr('y2', yAxis)
        .attr('stroke', '#cbd5e1')
        .attr('stroke-width', 1)
        .attr('opacity', 0.4)

      // Calculate label position with better offset
      const labelRadius = radius + 35
      const labelX = labelRadius * Math.cos(angle)
      const labelY = labelRadius * Math.sin(angle)
      
      // Determine text anchor based on angle
      let textAnchor = 'middle'
      if (Math.abs(Math.cos(angle)) > 0.8) {
        textAnchor = Math.cos(angle) > 0 ? 'start' : 'end'
      }

      // Add skill label with background for better readability
      const labelGroup = svg.append('g')
        .attr('transform', `translate(${labelX}, ${labelY})`)
        .attr('cursor', 'pointer')
      
      // Add background rect for text
      labelGroup.append('rect')
        .attr('x', textAnchor === 'middle' ? -30 : (textAnchor === 'start' ? -5 : -55))
        .attr('y', -10)
        .attr('width', 60)
        .attr('height', 20)
        .attr('rx', 4)
        .attr('fill', 'white')
        .attr('stroke', '#3b82f6')
        .attr('stroke-width', 1)
        .attr('opacity', 0.9)
      
      // Add text
      labelGroup.append('text')
        .attr('x', 0)
        .attr('y', 4)
        .attr('text-anchor', 'middle')
        .style('font-size', '11px')
        .style('font-weight', 'bold')
        .style('fill', '#1f2937')
        .text(d.skill)
      
      // Add hover effect
      labelGroup.on('mouseover', function() {
        d3.select(this).select('rect')
          .transition()
          .duration(200)
          .attr('fill', '#3b82f6')
        
        d3.select(this).select('text')
          .transition()
          .duration(200)
          .style('fill', 'white')
        
        // Highlight the corresponding axis
        svg.append('line')
          .attr('x1', 0)
          .attr('y1', 0)
          .attr('x2', x)
          .attr('y2', yAxis)
          .attr('stroke', '#3b82f6')
          .attr('stroke-width', 2)
          .attr('opacity', 0.8)
          .attr('class', 'highlight-line')
      })
      
      labelGroup.on('mouseout', function() {
        d3.select(this).select('rect')
          .transition()
          .duration(200)
          .attr('fill', 'white')
        
        d3.select(this).select('text')
          .transition()
          .duration(200)
          .style('fill', '#1f2937')
        
        svg.selectAll('.highlight-line').remove()
      })
    })

    // Calculate points for the radar polygon
    const points: Array<[number, number]> = data.map((d, i) => {
      const angle = i * angleSlice - Math.PI / 2
      const r = scale(d.value)
      const x = r * Math.cos(angle)
      const yAxis = r * Math.sin(angle)
      return [x, yAxis]
    })

    // Close the polygon by adding the first point at the end
    const polygonPoints = [...points, points[0]]

    // Draw the radar area with gradient
    const gradient = svg.append('defs')
      .append('linearGradient')
      .attr('id', 'radar-gradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '100%')
    
    gradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#3b82f6')
      .attr('stop-opacity', 0.6)
    
    gradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#8b5cf6')
      .attr('stop-opacity', 0.3)

    // Draw the radar area (filled polygon)
    svg.append('polygon')
      .attr('points', polygonPoints.map(p => p.join(',')).join(' '))
      .attr('fill', 'url(#radar-gradient)')
      .attr('stroke', '#3b82f6')
      .attr('stroke-width', 3)
      .attr('stroke-linejoin', 'round')
      .attr('opacity', 0)
      .transition()
      .duration(1500)
      .attr('opacity', 1)

    // Add data points with animation and tooltips
    points.forEach((point, i) => {
      const [x, yAxis] = point
      const skillData = data[i]
      
      // Add glow effect
      const pointGroup = svg.append('g')
        .attr('transform', `translate(${x}, ${yAxis})`)
        .attr('cursor', 'pointer')
      
      pointGroup.append('circle')
        .attr('r', 0)
        .attr('fill', '#3b82f6')
        .attr('stroke', 'white')
        .attr('stroke-width', 3)
        .transition()
        .delay(1500 + i * 100)
        .duration(500)
        .attr('r', 8)
      
      pointGroup.append('circle')
        .attr('r', 0)
        .attr('fill', 'white')
        .transition()
        .delay(1500 + i * 100 + 200)
        .duration(300)
        .attr('r', 3)
      
      // Add tooltip on hover
      pointGroup.on('mouseover', function() {
        d3.select(this).select('circle')
          .transition()
          .duration(200)
          .attr('r', 12)
          .attr('fill', '#2563eb')
        
        // Show tooltip
        const tooltipX = x > 0 ? x + 20 : x - 20
        const tooltipY = yAxis > 0 ? yAxis - 20 : yAxis + 20
        
        const tooltip = svg.append('g')
          .attr('class', 'tooltip-group')
          .attr('transform', `translate(${tooltipX}, ${tooltipY})`)
        
        tooltip.append('rect')
          .attr('x', -45)
          .attr('y', -25)
          .attr('width', 90)
          .attr('height', 35)
          .attr('rx', 6)
          .attr('fill', '#1f2937')
          .attr('stroke', '#3b82f6')
          .attr('stroke-width', 2)
          .attr('opacity', 0.95)
        
        tooltip.append('text')
          .attr('x', 0)
          .attr('y', -10)
          .attr('text-anchor', 'middle')
          .style('font-size', '11px')
          .style('fill', 'white')
          .style('font-weight', 'bold')
          .text(skillData.skill)
        
        tooltip.append('text')
          .attr('x', 0)
          .attr('y', 5)
          .attr('text-anchor', 'middle')
          .style('font-size', '10px')
          .style('fill', '#93c5fd')
          .text(`Proficiency: ${skillData.value}%`)
      })
      
      pointGroup.on('mouseout', function() {
        d3.select(this).select('circle')
          .transition()
          .duration(200)
          .attr('r', 8)
          .attr('fill', '#3b82f6')
        
        svg.selectAll('.tooltip-group').remove()
      })
    })

    // Add value labels near points
    points.forEach((point, i) => {
      const [x, yAxis] = point
      const angle = i * angleSlice - Math.PI / 2
      const offset = 18
      const offsetX = offset * Math.cos(angle)
      const offsetY = offset * Math.sin(angle)
      
      svg.append('text')
        .attr('x', x + offsetX)
        .attr('y', yAxis + offsetY)
        .attr('text-anchor', 'middle')
        .style('font-size', '0px')
        .style('font-weight', 'bold')
        .style('fill', '#3b82f6')
        .style('cursor', 'pointer')
        .text(`${data[i].value}%`)
        .transition()
        .delay(2000 + i * 100)
        .duration(500)
        .style('font-size', '12px')
    })

    // Add title
    svg.append('text')
      .attr('x', 0)
      .attr('y', -radius - 25)
      .attr('text-anchor', 'middle')
      .style('font-size', '20px')
      .style('font-weight', 'bold')
      .style('fill', '#3b82f6')
      .text('Technical Skills Radar Chart')

    // Add subtitle with your designation
    svg.append('text')
      .attr('x', 0)
      .attr('y', -radius - 8)
      .attr('text-anchor', 'middle')
      .style('font-size', '13px')
      .style('fill', '#6b7280')
      .text('Senior Software Engineer & Technical Lead - Skill Proficiency Assessment')

    // Add legend for categories with actual categories
    const categories = ['Frontend', 'Backend', 'Database', 'DevOps', 'Architecture']
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']
    
    const legend = svg.append('g')
      .attr('transform', `translate(${radius + 20}, ${-radius + 30})`)
    
    categories.forEach((cat, i) => {
      const color = colors[i % colors.length]
      
      legend.append('circle')
        .attr('cx', 0)
        .attr('cy', i * 22)
        .attr('r', 5)
        .attr('fill', color)
      
      legend.append('text')
        .attr('x', 12)
        .attr('y', i * 22 + 4)
        .style('font-size', '11px')
        .style('fill', '#4b5563')
        .style('font-weight', '500')
        .text(cat)
    })

    // Add a subtle outer ring
    svg.append('circle')
      .attr('r', radius + 5)
      .attr('fill', 'none')
      .attr('stroke', '#e2e8f0')
      .attr('stroke-width', 2)
      .attr('opacity', 0.3)

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
        style={{ minWidth: '650px', maxWidth: '100%', height: 'auto' }}
      />
    </motion.div>
  )
}

export default SkillRadarChart