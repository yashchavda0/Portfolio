"use client";

import { FloatingDock } from "@/components/ui/floating-dock";
import {
  FiHome,
  FiUser,
  FiBriefcase,
  FiFolder,
  FiCpu,
  FiBook,
  FiMail,
} from "react-icons/fi";

const navItems = [
  { title: "Home", icon: <FiHome className="w-full h-full text-neutral-300" />, href: "#home" },
  { title: "About", icon: <FiUser className="w-full h-full text-neutral-300" />, href: "#about" },
  { title: "Experience", icon: <FiBriefcase className="w-full h-full text-neutral-300" />, href: "#experience" },
  { title: "Projects", icon: <FiFolder className="w-full h-full text-neutral-300" />, href: "#projects" },
  { title: "Skills", icon: <FiCpu className="w-full h-full text-neutral-300" />, href: "#skills" },
  { title: "Education", icon: <FiBook className="w-full h-full text-neutral-300" />, href: "#education" },
  { title: "Contact", icon: <FiMail className="w-full h-full text-neutral-300" />, href: "#contact" },
];

export default function Navigation() {
  return <FloatingDock items={navItems} />;
}
