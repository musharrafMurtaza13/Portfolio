'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { motion } from 'framer-motion'

const TechStackGraph = () => {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const nodes = [
      { id: 'Frontend', group: 1, size: 30 },
      { id: 'Backend', group: 1, size: 30 },
      { id: 'Database', group: 1, size: 30 },
      { id: 'DevOps', group: 1, size: 30 },
      { id: 'Angular', group: 2, size: 20 },
      { id: 'React', group: 2, size: 20 },
      { id: 'Next.js', group: 2, size: 20 },
      { id: '.NET Core', group: 3, size: 25 },
      { id: 'Node.js', group: 3, size: 20 },
      { id: 'SQL Server', group: 4, size: 20 },
      { id: 'MongoDB', group: 4, size: 18 },
      { id: 'Docker', group: 5, size: 18 },
      { id: 'CI/CD', group: 5, size: 18 }
    ]

    const links = [
      { source: 'Angular', target: 'Frontend' },
      { source: 'React', target: 'Frontend' },
      { source: 'Next.js', target: 'Frontend' },
      { source: '.NET Core', target: 'Backend' },
      { source: 'Node.js', target: 'Backend' },
      { source: 'SQL Server', target: 'Database' },
      { source: 'MongoDB', target: 'Database' },
      { source: 'Docker', target: 'DevOps' },
      { source: 'CI/CD', target: 'DevOps' },
      { source: 'Frontend', target: 'Backend' },
      { source: 'Backend', target: 'Database' }
    ]

    const width = 800
    const height = 500

    d3.select(svgRef.current).selectAll('*').remove()

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)

    const simulation = d3.forceSimulation(nodes as any)
      .force('link', d3.forceLink(links).id((d: any) => d.id).distance(150))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))

    const link = svg.append('g')
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', 2)

    const node = svg.append('g')
      .selectAll('g')
      .data(nodes)
      .enter()
      .append('g')
      .call(d3.drag<any, any>()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended) as any)

    node.append('circle')
      .attr('r', d => d.size)
      .attr('fill', d => {
        const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']
        return colors[d.group - 1]
      })
      .attr('opacity', 0.8)
      .on('mouseover', function() {
        d3.select(this).transition().duration(200).attr('r', d => (d as any).size + 5).attr('opacity', 1)
      })
      .on('mouseout', function() {
        d3.select(this).transition().duration(200).attr('r', d => (d as any).size).attr('opacity', 0.8)
      })

    node.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '.3em')
      .attr('fill', 'white')
      .style('font-size', '10px')
      .style('font-weight', 'bold')
      .text(d => d.id)

    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y)

      node
        .attr('transform', (d: any) => `translate(${d.x},${d.y})`)
    })

    function dragstarted(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart()
      d.fx = d.x
      d.fy = d.y
    }

    function dragged(event: any, d: any) {
      d.fx = event.x
      d.fy = event.y
    }

    function dragended(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0)
      d.fx = null
      d.fy = null
    }

  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex justify-center items-center p-4"
    >
      <svg ref={svgRef} className="w-full h-auto" style={{ minHeight: '500px' }}></svg>
    </motion.div>
  )
}

export default TechStackGraph