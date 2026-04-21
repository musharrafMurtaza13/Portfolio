export interface Skill {
  name: string
  level: number
  category: string
}

export interface Experience {
  title: string
  company: string
  period: string
  achievements: string[]
}

export interface Achievement {
  title: string
  description: string
  metric: string
  icon: string
}

export interface Project {
  name: string
  description: string
  technologies: string[]
  link?: string
}