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
    title: "FuqqAss Agenda",
    description: "Agenda dat leeft in de nu ipv de toekomst.",
    date: "Mei 2025",
    skills: ["expo", "react native", "tailwind css"],
      color: "#ffffff",
      position: { x: 70, y: 65 },
      connections: ["p5"]
    },

  
];