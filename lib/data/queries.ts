import { faculties, programmes, trainingCourses } from "./content";
import type { Faculty, Programme, TrainingCourse } from "./types";

/**
 * Single access point for content. Pages call these functions only, so moving
 * from seed content to Supabase rows (spec 5.2) is a change in this file.
 */

export async function getFaculties(): Promise<Faculty[]> {
  return faculties;
}

export async function getFaculty(slug: string): Promise<Faculty | undefined> {
  return faculties.find((f) => f.slug === slug);
}

export async function getProgrammes(facultySlug?: string): Promise<Programme[]> {
  return facultySlug ? programmes.filter((p) => p.facultySlug === facultySlug) : programmes;
}

export async function getProgramme(
  facultySlug: string,
  slug: string,
): Promise<Programme | undefined> {
  return programmes.find((p) => p.facultySlug === facultySlug && p.slug === slug);
}

export async function getTrainingCourses(): Promise<TrainingCourse[]> {
  return trainingCourses;
}

export async function getTrainingCourse(slug: string): Promise<TrainingCourse | undefined> {
  return trainingCourses.find((c) => c.slug === slug);
}
