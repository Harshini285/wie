import { useState, useEffect } from 'react';
import { Search, Filter, GraduationCap } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CourseCard } from '@/components/cards/CourseCard';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import coursesData from '@/data/courses.json';

export default function StudyPortal() {
  const [searchQuery, setSearchQuery] = useState('');
  const [difficulty, setDifficulty] = useState('All');
  const [progress, setProgress] = useState<Record<string, number>>({});

  useEffect(() => {
    const saved = localStorage.getItem('nyayai_course_progress');
    if (saved) {
      setProgress(JSON.parse(saved));
    }
  }, []);

  const filteredCourses = coursesData.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = difficulty === 'All' || course.difficulty === difficulty;
    return matchesSearch && matchesDifficulty;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="py-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-teal shadow-glow mb-4">
              <GraduationCap className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="font-heading font-bold text-3xl sm:text-4xl text-foreground mb-2">
              Study Portal
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Master Indian law with interactive courses, quizzes, and comprehensive resources designed for law students and professionals.
            </p>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={difficulty} onValueChange={setDifficulty}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Levels</SelectItem>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <div className="p-4 rounded-xl glass-card text-center">
              <p className="text-2xl font-heading font-bold text-teal">{coursesData.length}</p>
              <p className="text-sm text-muted-foreground">Total Courses</p>
            </div>
            <div className="p-4 rounded-xl glass-card text-center">
              <p className="text-2xl font-heading font-bold text-teal">
                {coursesData.reduce((acc, c) => acc + c.lessons, 0)}
              </p>
              <p className="text-sm text-muted-foreground">Total Lessons</p>
            </div>
            <div className="p-4 rounded-xl glass-card text-center">
              <p className="text-2xl font-heading font-bold text-amber">
                {Object.keys(progress).length}
              </p>
              <p className="text-sm text-muted-foreground">In Progress</p>
            </div>
            <div className="p-4 rounded-xl glass-card text-center">
              <p className="text-2xl font-heading font-bold text-emerald-400">
                {Object.values(progress).filter(p => p === 100).length}
              </p>
              <p className="text-sm text-muted-foreground">Completed</p>
            </div>
          </div>

          {/* Courses Grid */}
          {filteredCourses.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No courses found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  {...course}
                  progress={progress[course.id] || 0}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
