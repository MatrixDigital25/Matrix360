import React from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { Button } from '@/src/components/ui/Button';
import { 
  Folder, 
  Clock, 
  Users, 
  CheckCircle2, 
  MoreHorizontal, 
  Plus, 
  Briefcase, 
  Calendar,
  Search,
  Filter
} from 'lucide-react';

const PROJECTS = [
  {
    id: 1,
    name: 'APAC Market Entry Strategy',
    client: 'Fintech Global Ltd.',
    status: 'In Progress',
    deadline: 'Oct 24, 2024',
    team: ['Sarah Jenkins', 'Marcus Chen'],
    progress: 75
  },
  {
    id: 2,
    name: 'EU AI Act Compliance Audit',
    client: 'EuroBank Group',
    status: 'On Hold',
    deadline: 'Nov 12, 2024',
    team: ['Elena Rostova'],
    progress: 40
  },
  {
    id: 3,
    name: 'Supply Chain Risk Mitigation',
    client: 'AutoParts Corp.',
    status: 'Completed',
    deadline: 'Sep 30, 2024',
    team: ['David Okafor', 'Aisha Patel'],
    progress: 100
  }
];

export default function Projects() {
  return (
    <div className="space-y-12 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-text-main">Active Projects</h1>
          <p className="text-text-muted mt-1">Manage your strategic consulting engagements and AI implementations.</p>
        </div>
        <Button className="h-10 px-6 bg-interaction-primary text-white border-none">
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted group-focus-within:text-interaction-primary transition-colors" />
          <input 
            placeholder="Search projects by name or client..." 
            className="w-full pl-12 h-12 bg-white shadow-sm border border-border-light rounded-xl focus:ring-2 focus:ring-interaction-primary focus:outline-none transition-all"
          />
        </div>
        <Button variant="secondary" className="h-12 px-6 bg-white border-border-light">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>

      <div className="space-y-6">
        {PROJECTS.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="bg-white border-border-light shadow-sm hover:shadow-md transition-all">
              <CardContent className="p-5">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="h-12 w-12 rounded-xl bg-secondary-bg flex items-center justify-center border border-border-light">
                      <Folder className="h-6 w-6 text-interaction-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-text-main">{project.name}</h3>
                      <p className="text-sm text-text-muted">{project.client}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-8">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-text-muted mb-1 font-bold">Status</p>
                      <Badge variant="secondary" className={`text-[10px] uppercase tracking-wider px-2 py-0.5 border-none ${
                        project.status === 'Completed' 
                          ? 'bg-alert-opportunity/10 text-alert-opportunity' 
                          : project.status === 'On Hold'
                          ? 'bg-alert-risk/10 text-alert-risk'
                          : 'bg-interaction-primary/10 text-interaction-primary'
                      }`}>
                        {project.status}
                      </Badge>
                    </div>

                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-text-muted mb-1 font-bold">Deadline</p>
                      <div className="flex items-center gap-1.5 text-sm font-medium text-text-main">
                        <Calendar className="h-3.5 w-3.5 text-gray-400" />
                        {project.deadline}
                      </div>
                    </div>

                    <div className="w-32">
                      <p className="text-[10px] uppercase tracking-wider text-text-muted mb-1 font-bold">Progress</p>
                      <div className="h-2 w-full bg-secondary-bg rounded-full overflow-hidden border border-border-light">
                        <div 
                          className="h-full bg-interaction-primary transition-all duration-1000" 
                          style={{ width: `${project.progress}%` }} 
                        />
                      </div>
                    </div>

                    <div className="flex -space-x-2">
                      {project.team.map((member, i) => (
                        <div 
                          key={i} 
                          className="h-8 w-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-text-muted"
                          title={member}
                        >
                          {member.charAt(0)}
                        </div>
                      ))}
                    </div>

                    <button className="p-2 hover:bg-secondary-bg rounded-lg transition-colors">
                      <MoreHorizontal className="h-5 w-5 text-text-muted" />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
