import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ScrollFadeDirective } from '../../directives/scroll-fade.directive';
import { MetaService } from '../../services/meta.service';
import { TranslationService } from '../../services/translation.service';

interface SkillCategory {
  labelKey: string;
  color: string;
  skills: string[];
}

@Component({
  selector: 'app-competenze',
  imports: [ScrollFadeDirective, RouterModule],
  templateUrl: './competenze.component.html',
  styleUrl: './competenze.component.css',
  changeDetection: ChangeDetectionStrategy.Eager
})
export class CompetenzeComponent implements OnInit {
  private meta = inject(MetaService);
  private ts = inject(TranslationService);
  tr(key: string): string { return this.ts.t(key); }

  ngOnInit(): void {
    this.meta.setPageMeta({
      title: 'Competenze',
      description: 'Competenze tecniche e soft skills: Angular, React, Java, JavaScript, CSS, HTML e molto altro.'
    });
  }

  categories: SkillCategory[] = [
    {
      labelKey: 'competenze.cat.frontend',
      color: '#ff9900',
      skills: ['Angular', 'React', 'Next.js', 'Blazor', 'HTML5', 'CSS3', 'JavaScript', 'TypeScript']
    },
    {
      labelKey: 'competenze.cat.backend',
      color: '#4fc3f7',
      skills: ['Java', 'C#', '.NET', 'PHP', 'Quarkus', 'Python']
    },
    {
      labelKey: 'competenze.cat.database',
      color: '#81c784',
      skills: ['SQL', 'MySQL', 'MongoDB', 'Redis']
    },
    {
      labelKey: 'competenze.cat.tools',
      color: '#ce93d8',
      skills: ['Git', 'Figma', 'VS Code']
    }
  ];

  softSkills = [
    { icon: '🤝', labelKey: 'competenze.teamwork' },
    { icon: '💬', labelKey: 'competenze.communication' },
    { icon: '📋', labelKey: 'competenze.organization' },
    { icon: '🧠', labelKey: 'competenze.problemsolving' }
  ];
}
