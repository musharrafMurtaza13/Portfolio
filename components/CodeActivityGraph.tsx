'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { motion } from 'framer-motion'

const CodeActivityGraph = () => {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const data = [
      { month: 'Jan', commits: 45, prs: 12, reviews: 28 },
      { month: 'Feb', commits: 52, prs: 15, reviews: 32 },
      { month: 'Mar', commits: 48, prs: 14, reviews: 30 },
      { month: 'Apr', commits: 60, prs: 18, reviews: 35 },
      { month: 'May', commits: 55, prs: 16, reviews: 33 },
      { month: 'Jun', commits: 42, prs: 11, reviews: 25 }
    ]

    const width = 800
    const height = 400
    const margin = { top: 50, right: 80, bottom: 50, left: 60 }

    d3.select(svgRef.current).selectAll('*').remove()

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    const x = d3.scaleBand()
      .domain(data.map(d => d.month))
      .range([0, width - margin.left - margin.right])
      .padding(0.2)

    const y = d3.scaleLinear()
      .domain([0, 70])
      .range([height - margin.top - margin.bottom, 0])

    const lineCommit = d3.line<{ month: string; commits: number }>()
      .x(d => (x(d.month) || 0) + x.bandwidth() / 2)
      .y(d => y(d.commits))

    const linePRs = d3.line<{ month: string; prs: number }>()
      .x(d => (x(d.month) || 0) + x.bandwidth() / 2)
      .y(d => y(d.prs))

    // Add areas
    svg.append('path')
      .datum(data)
      .attr('fill', 'rgba(59, 130, 246, 0.2)')
      .attr('d', lineCommit(data as any))
      .attr('stroke', 'none')

    // Add lines with animation
    const pathCommit = svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#3b82f6')
      .attr('stroke-width', 3)
      .attr('d', lineCommit(data as any))

    const totalLengthCommit = pathCommit.node()?.getTotalLength() || 0
    pathCommit
      .attr('stroke-dasharray', totalLengthCommit)
      .attr('stroke-dashoffset', totalLengthCommit)
      .transition()
      .duration(2000)
      .attr('stroke-dashoffset', 0)

    const pathPRs = svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#10b981')
      .attr('stroke-width', 3)
      .attr('d', linePRs(data as any))

    const totalLengthPRs = pathPRs.node()?.getTotalLength() || 0
    pathPRs
      .attr('stroke-dasharray', totalLengthPRs)
      .attr('stroke-dashoffset', totalLengthPRs)
      .transition()
      .duration(2000)
      .delay(500)
      .attr('stroke-dashoffset', 0)

    // Add points
    data.forEach((d, i) => {
      svg.append('circle')
        .attr('cx', (x(d.month) || 0) + x.bandwidth() / 2)
        .attr('cy', y(d.commits))
        .attr('r', 0)
        .attr('fill', '#3b82f6')
        .transition()
        .delay(2000)
        .duration(300)
        .attr('r', 6)

      svg.append('circle')
        .attr('cx', (x(d.month) || 0) + x.bandwidth() / 2)
        .attr('cy', y(d.prs))
        .attr('r', 0)
        .attr('fill', '#10b981')
        .transition()
        .delay(2500)
        .duration(300)
        .attr('r', 6)
    })

    // Add axes
    svg.append('g')
      .attr('transform', `translate(0, ${height - margin.top - margin.bottom})`)
      .call(d3.axisBottom(x))

    svg.append('g')
      .call(d3.axisLeft(y))

    // Add legend
    const legend = svg.append('g')
      .attr('transform', `translate(${width - margin.left - margin.right - 100}, -20)`)

    legend.append('line')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', 20)
      .attr('y2', 0)
      .attr('stroke', '#3b82f6')
      .attr('stroke-width', 3)

    legend.append('text')
      .attr('x', 30)
      .attr('y', 4)
      .style('font-size', '12px')
      .text('Commits')

    legend.append('line')
      .attr('x1', 0)
      .attr('y1', 20)
      .attr('x2', 20)
      .attr('y2', 20)
      .attr('stroke', '#10b981')
      .attr('stroke-width', 3)

    legend.append('text')
      .attr('x', 30)
      .attr('y', 24)
      .style('font-size', '12px')
      .text('PRs')

  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex justify-center items-center p-4"
    >
      <svg ref={svgRef} className="w-full h-auto" style={{ minHeight: '450px' }}></svg>
    </motion.div>
  )
}

export default CodeActivityGraph