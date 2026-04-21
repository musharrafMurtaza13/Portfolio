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

    const width = 800
    const height = 700
    const radius = Math.min(width, height) / 2.5
    const centerX = width / 2
    const centerY = height / 2

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
      
      const value = (level / levels) * 100
      svg.append('text')
        .attr('x', -radius - 15)
        .attr('y', -r)
        .attr('text-anchor', 'middle')
        .style('font-size', '10px')
        .style('fill', '#94a3b8')
        .text(`${Math.round(value)}`)
    }

    // Draw axes and labels
    data.forEach((d, i) => {
      const angle = i * angleSlice - Math.PI / 2
      const x = radius * Math.cos(angle)
      const y = radius * Math.sin(angle)

      svg.append('line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', x)
        .attr('y2', y)
        .attr('stroke', '#cbd5e1')
        .attr('stroke-width', 1)
        .attr('opacity', 0.4)

      const labelRadius = radius + 45
      let labelX = labelRadius * Math.cos(angle)
      let labelY = labelRadius * Math.sin(angle)
      
      let textAnchor = 'middle'
      let dx = 0
      let dy = 0
      
      if (Math.abs(Math.cos(angle)) < 0.3) {
        textAnchor = 'middle'
        dx = 0
        dy = Math.sin(angle) > 0 ? -10 : 10
      } else if (Math.cos(angle) > 0) {
        textAnchor = 'start'
        dx = 5
        dy = 0
      } else {
        textAnchor = 'end'
        dx = -5
        dy = 0
      }
      
      if (d.skill === 'Entity Framework') {
        dy = Math.sin(angle) > 0 ? -15 : 15
      }
      if (d.skill === 'Microservices') {
        dx = Math.cos(angle) > 0 ? 10 : -10
      }
      
      labelX += dx
      labelY += dy

      const labelGroup = svg.append('g')
        .attr('transform', `translate(${labelX}, ${labelY})`)
        .attr('cursor', 'pointer')
      
      const textLength = d.skill.length * 7
      
      labelGroup.append('rect')
        .attr('x', textAnchor === 'middle' ? -textLength/2 - 5 : (textAnchor === 'start' ? -5 : -textLength - 5))
        .attr('y', -12)
        .attr('width', textLength + 10)
        .attr('height', 22)
        .attr('rx', 4)
        .attr('fill', 'white')
        .attr('stroke', '#3b82f6')
        .attr('stroke-width', 1.5)
        .attr('class', 'label-bg')
      
      labelGroup.append('text')
        .attr('x', 0)
        .attr('y', 4)
        .attr('text-anchor', textAnchor)
        .style('font-size', '11px')
        .style('font-weight', 'bold')
        .style('fill', '#1f2937')
        .style('pointer-events', 'none')
        .text(d.skill)
      
      labelGroup.on('mouseover', function() {
        d3.select(this).select('.label-bg')
          .transition()
          .duration(200)
          .attr('fill', '#3b82f6')
        
        d3.select(this).select('text')
          .transition()
          .duration(200)
          .style('fill', 'white')
        
        svg.append('line')
          .attr('x1', 0)
          .attr('y1', 0)
          .attr('x2', x)
          .attr('y2', y)
          .attr('stroke', '#3b82f6')
          .attr('stroke-width', 3)
          .attr('opacity', 0.8)
          .attr('class', 'highlight-line')
      })
      
      labelGroup.on('mouseout', function() {
        d3.select(this).select('.label-bg')
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
      const y = r * Math.sin(angle)
      return [x, y]
    })

    const polygonPoints = [...points, points[0]]

    // Create gradient
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

    // Draw radar area - NO OPACITY TRANSITION
    svg.append('polygon')
      .attr('points', polygonPoints.map(p => p.join(',')).join(' '))
      .attr('fill', 'url(#radar-gradient)')
      .attr('stroke', '#3b82f6')
      .attr('stroke-width', 3)
      .attr('stroke-linejoin', 'round')

    // Add data points - NO OPACITY TRANSITION
    points.forEach((point, i) => {
      const [x, y] = point
      const skillData = data[i]
      
      const pointGroup = svg.append('g')
        .attr('transform', `translate(${x}, ${y})`)
        .attr('cursor', 'pointer')
      
      pointGroup.append('circle')
        .attr('r', 8)
        .attr('fill', '#3b82f6')
        .attr('stroke', 'white')
        .attr('stroke-width', 3)
      
      pointGroup.append('circle')
        .attr('r', 3)
        .attr('fill', 'white')
      
      pointGroup.on('mouseover', function() {
        pointGroup.select('circle:first-child')
          .attr('r', 12)
          .attr('fill', '#2563eb')
        
        let tooltipX = x + 15
        let tooltipY = y - 15
        if (x < 0) tooltipX = x - 85
        if (y < 0) tooltipY = y - 25
        
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
        pointGroup.select('circle:first-child')
          .attr('r', 8)
          .attr('fill', '#3b82f6')
        
        svg.selectAll('.tooltip-group').remove()
      })
    })

    // Add value labels - NO OPACITY TRANSITION
    points.forEach((point, i) => {
      const [x, y] = point
      const angle = i * angleSlice - Math.PI / 2
      
      let offsetX = 12
      let offsetY = -12
      
      if (Math.abs(Math.cos(angle)) > 0.7) {
        offsetX = Math.cos(angle) > 0 ? 15 : -15
        offsetY = -8
      }
      
      svg.append('text')
        .attr('x', x + offsetX)
        .attr('y', y + offsetY)
        .attr('text-anchor', 'middle')
        .style('font-size', '11px')
        .style('font-weight', 'bold')
        .style('fill', '#3b82f6')
        .style('cursor', 'pointer')
        .text(`${data[i].value}%`)
    })

    // Add title
    svg.append('text')
      .attr('x', 0)
      .attr('y', -radius - 30)
      .attr('text-anchor', 'middle')
      .style('font-size', '18px')
      .style('font-weight', 'bold')
      .style('fill', '#1f2937')
      .text('Technical Skills Radar Chart')

    // Add subtitle
    svg.append('text')
      .attr('x', 0)
      .attr('y', -radius - 12)
      .attr('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('fill', '#6b7280')
      .text('Senior Software Engineer & Technical Lead - Skill Proficiency Assessment')

    // Add legend
    const categories = ['Frontend', 'Backend', 'Database', 'DevOps', 'Architecture']
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']
    
    const legend = svg.append('g')
      .attr('transform', `translate(${radius + 30}, ${-radius + 40})`)
    
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

    svg.append('circle')
      .attr('r', radius + 5)
      .attr('fill', 'none')
      .attr('stroke', '#e2e8f0')
      .attr('stroke-width', 2)
      .attr('opacity', 0.3)

  }, [])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
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