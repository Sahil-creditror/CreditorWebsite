"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Project = {
  title: string;
  slug: string;
  tagline?: string;
  ScopeOfWork: string[];
  industry?: string;
  coverImage: string;
  description?: string | string[];
};

const ProjectGrid = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {projects.slice(0, 6).map((project, index) => (
        <div
          key={index}
          className="group relative rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-gray-900 hover:shadow-2xl transition-all duration-300 flex flex-col"
        >
          {/* Image with hover zoom */}
          <div className="relative w-full h-64 overflow-hidden">
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <Link
              href={`/projects/${project.slug}`}
              className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition"
            >
              <svg
                width="60"
                height="60"
                viewBox="0 0 65 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.333374"
                  width="64"
                  height="64"
                  rx="32"
                  fill="#026fe2"
                />
                <path
                  d="M25.6667 25.3333H39M39 25.3333V38.6666M39 25.3333L25.6667 38.6666"
                  stroke="#1F2A2E"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>

          {/* Content */}
          <div className="p-5 flex flex-col gap-4">
            <h3 className="text-xl font-semibold dark:text-white group-hover:text-primary transition">
              {project.title}
            </h3>

            {/* ✅ Tagline under title (italic + bold + blue) */}
            {project.tagline && (
              <p className="text-base font-bold italic text-blue-600">
                {project.tagline}
              </p>
            )}

            {/* Description */}
            {project.description && (
              <div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2 flex items-center gap-2">
                  {/* 🎓 Graduation Cap SVG */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 14l9-5-9-5-9 5 9 5zm0 0v7m0-7L3 9m9 5l9-5"
                    />
                  </svg>
                  What you will learn
                </h4>
                {Array.isArray(project.description) ? (
                  <ul className="list-disc list-inside text-base text-gray-700 dark:text-gray-300 space-y-2">
                    {project.description.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-base text-gray-700 dark:text-gray-300">
                    {project.description}
                  </p>
                )}
              </div>
            )}

            {/* Scope of Work */}
            {project.ScopeOfWork.length > 0 && (
              <div className="mt-3">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2 flex items-center gap-2">
                  {/* 📊 Chart Bar SVG */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 17v-6h2v6H9zm-4 0v-2h2v2H5zm8 0v-10h2v10h-2zm4 0v-14h2v14h-2z"
                    />
                  </svg>
                  Business Model
                </h4>
                <div className="flex gap-2 flex-wrap">
                  {project.ScopeOfWork.slice(0, 3).map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-sm bg-primary/10 dark:bg-white/10 dark:text-white px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectGrid;
