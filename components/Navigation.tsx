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
  { title: "Home", icon: <FiHome className="w-full h-full text-[var(--color-text-muted)]" />, href: "#home" },
  { title: "About", icon: <FiUser className="w-full h-full text-[var(--color-text-muted)]" />, href: "#about" },
  { title: "Experience", icon: <FiBriefcase className="w-full h-full text-[var(--color-text-muted)]" />, href: "#experience" },
  { title: "Projects", icon: <FiFolder className="w-full h-full text-[var(--color-text-muted)]" />, href: "#projects" },
  { title: "Skills", icon: <FiCpu className="w-full h-full text-[var(--color-text-muted)]" />, href: "#skills" },
  { title: "Education", icon: <FiBook className="w-full h-full text-[var(--color-text-muted)]" />, href: "#education" },
  { title: "Contact", icon: <FiMail className="w-full h-full text-[var(--color-text-muted)]" />, href: "#contact" },
];

export default function Navigation() {
  return <FloatingDock items={navItems} />;
}
