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

    const data: SkillData[] = [
      { skill: 'Angular', value: 90, category: 'Frontend' },
      { skill: 'React', value: 85, category: 'Frontend' },
      { skill: '.NET Core', value: 95, category: 'Backend' },
      { skill: 'SQL Server', value: 88, category: 'Database' },
      { skill: 'Node.js', value: 80, category: 'Backend' },
      { skill: 'TypeScript', value: 92, category: 'Frontend' },
      { skill: 'Docker', value: 75, category: 'DevOps' },
      { skill: 'Architecture', value: 85, category: 'Architecture' }
    ]

    const width = 600
    const height = 600
    const radius = Math.min(width, height) / 2.5

    // Clear previous content
    d3.select(svgRef.current).selectAll('*').remove()

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`)

    const angleSlice = Math.PI * 2 / data.length
    const scale = d3.scaleLinear()
      .domain([0, 100])
      .range([0, radius])

    // Draw background circles
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
    }

    // Draw axes and labels
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
        .attr('stroke', '#e2e8f0')
        .attr('stroke-width', 1)
        .attr('opacity', 0.5)

      // Add label
      const labelX = (radius + 25) * Math.cos(angle)
      const labelY = (radius + 25) * Math.sin(angle)

      svg.append('text')
        .attr('x', labelX)
        .attr('y', labelY)
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .style('font-size', '12px')
        .style('font-weight', '600')
        .style('fill', '#4b5563')
        .style('cursor', 'pointer')
        .text(d.skill)
        .on('mouseover', function() {
          d3.select(this)
            .transition()
            .duration(200)
            .style('fill', '#3b82f6')
            .style('font-size', '14px')
        })
        .on('mouseout', function() {
          d3.select(this)
            .transition()
            .duration(200)
            .style('fill', '#4b5563')
            .style('font-size', '12px')
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

    // Draw the radar area (filled polygon)
    svg.append('polygon')
      .attr('points', polygonPoints.map(p => p.join(',')).join(' '))
      .attr('fill', 'rgba(59, 130, 246, 0.3)')
      .attr('stroke', '#3b82f6')
      .attr('stroke-width', 3)
      .attr('stroke-linejoin', 'round')
      .attr('opacity', 0)
      .transition()
      .duration(1500)
      .attr('opacity', 1)

    // Draw the radar outline (stroke only)
    svg.append('polygon')
      .attr('points', polygonPoints.map(p => p.join(',')).join(' '))
      .attr('fill', 'none')
      .attr('stroke', '#3b82f6')
      .attr('stroke-width', 3)
      .attr('stroke-linejoin', 'round')
      .attr('opacity', 0)
      .transition()
      .duration(1500)
      .attr('opacity', 1)

    // Add data points with animation
    points.forEach((point, i) => {
      const [x, yAxis] = point
      
      // Add glow effect
      svg.append('circle')
        .attr('cx', x)
        .attr('cy', yAxis)
        .attr('r', 0)
        .attr('fill', '#3b82f6')
        .attr('stroke', 'white')
        .attr('stroke-width', 3)
        .attr('cursor', 'pointer')
        .transition()
        .delay(1500 + i * 100)
        .duration(500)
        .attr('r', 8)
      
      // Add inner dot
      svg.append('circle')
        .attr('cx', x)
        .attr('cy', yAxis)
        .attr('r', 0)
        .attr('fill', 'white')
        .transition()
        .delay(1500 + i * 100 + 200)
        .duration(300)
        .attr('r', 3)
      
      // Add tooltip on hover
      svg.append('circle')
        .attr('cx', x)
        .attr('cy', yAxis)
        .attr('r', 12)
        .attr('fill', 'transparent')
        .attr('cursor', 'pointer')
        .on('mouseover', function(event) {
          // Show tooltip
          const tooltip = svg.append('g')
            .attr('class', 'tooltip-group')
            .attr('transform', `translate(${x + 15}, ${yAxis - 15})`)
          
          tooltip.append('rect')
            .attr('x', -40)
            .attr('y', -20)
            .attr('width', 80)
            .attr('height', 25)
            .attr('rx', 4)
            .attr('fill', '#1f2937')
            .attr('opacity', 0.9)
          
          tooltip.append('text')
            .attr('x', 0)
            .attr('y', -4)
            .attr('text-anchor', 'middle')
            .style('font-size', '11px')
            .style('fill', 'white')
            .style('font-weight', 'bold')
            .text(`${data[i].skill}`)
          
          tooltip.append('text')
            .attr('x', 0)
            .attr('y', 8)
            .attr('text-anchor', 'middle')
            .style('font-size', '10px')
            .style('fill', '#93c5fd')
            .text(`${data[i].value}%`)
          
          // Highlight the corresponding axis label
          svg.selectAll('text')
            .filter(function() {
              return d3.select(this).text() === data[i].skill
            })
            .transition()
            .duration(200)
            .style('fill', '#3b82f6')
            .style('font-size', '14px')
            .style('font-weight', 'bold')
        })
        .on('mouseout', function() {
          svg.selectAll('.tooltip-group').remove()
          
          // Reset axis label
          svg.selectAll('text')
            .filter(function() {
              return d3.select(this).text() === data[i].skill
            })
            .transition()
            .duration(200)
            .style('fill', '#4b5563')
            .style('font-size', '12px')
            .style('font-weight', '600')
        })
    })

    // Add value labels near points
    points.forEach((point, i) => {
      const [x, yAxis] = point
      const angle = i * angleSlice - Math.PI / 2
      const offset = 15
      const offsetX = offset * Math.cos(angle)
      const offsetY = offset * Math.sin(angle)
      
      svg.append('text')
        .attr('x', x + offsetX)
        .attr('y', yAxis + offsetY)
        .attr('text-anchor', 'middle')
        .style('font-size', '0px')
        .style('font-weight', 'bold')
        .style('fill', '#3b82f6')
        .text(`${data[i].value}%`)
        .transition()
        .delay(2000 + i * 100)
        .duration(500)
        .style('font-size', '11px')
    })

    // Add title
    svg.append('text')
      .attr('x', 0)
      .attr('y', -radius - 20)
      .attr('text-anchor', 'middle')
      .style('font-size', '18px')
      .style('font-weight', 'bold')
      .style('fill', '#3b82f6')
      .text('Technical Skills Radar Chart')

    // Add subtitle
    svg.append('text')
      .attr('x', 0)
      .attr('y', -radius - 5)
      .attr('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('fill', '#9ca3af')
      .text('Comprehensive skill assessment across different domains')

    // Add legend for skill categories
    const categories = ['Frontend', 'Backend', 'Database', 'DevOps', 'Architecture']
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']
    
    const legend = svg.append('g')
      .attr('transform', `translate(${radius + 30}, ${-radius + 20})`)
    
    categories.forEach((cat, i) => {
      const color = colors[i % colors.length]
      
      legend.append('circle')
        .attr('cx', 0)
        .attr('cy', i * 20)
        .attr('r', 5)
        .attr('fill', color)
      
      legend.append('text')
        .attr('x', 12)
        .attr('y', i * 20 + 4)
        .style('font-size', '10px')
        .style('fill', '#6b7280')
        .text(cat)
    })

    // Add radial grid labels (0, 20, 40, 60, 80, 100)
    for (let level = 1; level <= levels; level++) {
      const r = radius * (level / levels)
      const value = (level / levels) * 100
      
      svg.append('text')
        .attr('x', 5)
        .attr('y', -r)
        .attr('text-anchor', 'start')
        .style('font-size', '9px')
        .style('fill', '#9ca3af')
        .text(`${Math.round(value)}`)
    }

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
        style={{ minWidth: '600px', maxWidth: '100%', height: 'auto' }}
      />
    </motion.div>
  )
}

export default SkillRadarChart