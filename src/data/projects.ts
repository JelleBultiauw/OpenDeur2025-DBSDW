export interface Project {
  id: string;
  title: string;
  description: string;
  date: string;
  skills: string[];
  color: string;
  position: { x: number; y: number };
  connections: string[];
}

export const projects: Project[] = [
  {
    id: "p1",
    title: "Mind Hand Control",
    description: "Inlezen van EEG signalen en controleren van handbewegingen.",
    date: "September 2025",
    skills: ["Project Management", "EEG signalen"],
    color: "#ffffff",
    position: { x: 70, y: 5 },
    connections: ["p2"]
  },
  {
    id: "p2",
    title: "Roblox Game",
    description: "Smash Bros game gemaakt in Roblox Studio.",
    date: "October 2025",
    skills: ["Roblox Studio", "Game Development"],
    color: "#ffffff",
    position: { x: 70, y: 25 },
    connections: ["p3"]
  },
  {
    id: "p3",
    title: "StudStay Applicatie",
    description: "Applicatie voor het zoeken van een studentenhuis.",
    date: "November 2025",
    skills: ["UI/UX Design", "Prototyping"],
    color: "#ffffff",
    position: { x: 70, y: 45 },
    connections: ["p4"]
  },
  {
    id: "p4",
    title: "StudStayWebsite",
    description: "Website voor StudStay.",
    date: "December 2025",
    skills: ["HTML", "CSS", "JavaScript", "vite"],
    color: "#ffffff",
    position: { x: 70, y: 65 },
    connections: ["p5"]
  },
  {
    id: "p5",
    title: "Quality Assurance",
    description: "Comprehensive testing and bug fixing phase.",
    date: "February 2026",
    skills: ["Testing", "Quality Control", "Documentation"],
    color: "#ffffff",
    position: { x: 70, y: 85 },
    connections: ["p6"]
  },
  {
    id: "p6",
    title: "Project Launch",
    description: "Final deployment and project presentation.",
    date: "April 2026",
    skills: ["Deployment", "Presentation", "Documentation"],
    color: "#ffffff",
    position: { x: 70, y: 105 },
    connections: []
  }
];