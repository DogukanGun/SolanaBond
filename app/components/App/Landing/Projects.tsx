import React from 'react'
import Image from 'next/image'
import { PROJECTS } from '@/constants'
import { homeDictionary } from '@/constants/localesContent'

type ProjectItemProps = Readonly<{
  title: string
  image: string
  date: string
}>

function ProjectItem({ title, image, date }: ProjectItemProps) {
  return (
    <li className="flex w-full flex-1 flex-col justify-center items-center lg:ml-64">
      <Image src={image} alt="map" width={550} height={400} />
      <div className="mx-auto items-center justify-center">
        <h2 className="mt-5 text-2xl font-medium leading-loose">{title}</h2>
        <p className="mt-2 text-center text-sm leading-relaxed tracking-widest lg:mt-4 lg:bg-none">
          {date}
        </p>
      </div>
    </li>
  )
}

interface ProjectsProps {
  readonly locale: string
}

function Projects({ locale }: ProjectsProps) {
  return (
    <section className="flexCenter mt-36 flex-col">
      <div className="text-5xl font-bold leading-10">
        {homeDictionary[locale]?.ourWorks}
      </div>
      <div className="mt-6 text-center text-2xl leading-loose lg:w-[722px]">
        {homeDictionary[locale]?.ourWorksDesc}
      </div>
      <div className="mt-10 grid gap-10 p-10 sm:grid-cols-2 lg:mt-24 lg:grid-cols-3 lg:gap-20">
        {PROJECTS.map((project) => (
          <ProjectItem
            key={project.title}
            title={project.title}
            image={project.image}
            date={project.date}
          />
        ))}
        </div>
    </section>
  )
}

export default Projects
