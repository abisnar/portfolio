import type { Resume } from '../models/Resume';

export const resume: Resume = {
  profile: {
    name: 'Allan Bisnar',
    title: 'Technical Product Leader',
    location: 'Vancouver, BC, Canada',
    links: [
      {
        name: 'linkedin',
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/allan-bisnar-b96b59132',
      },
      {
        name: 'github',
        label: 'GitHub',
        href: 'https://github.com/abisnar',
      },
    ],
  },
  sections: [
    {
      id: 'summary',
      kind: 'summary',
      title: 'Summary',
      text:
        'Technical Product Leader with 8+ years designing, shipping, and scaling enterprise data platforms across AppNeta, Vision Critical, and Splunk. MBA candidate at SFU Beedie, translating customer pain points into strategy and roadmap priorities. Skilled at bridging engineering, design, and business to deliver data-driven, user-centric, and cost-optimized products that improve collaboration and productivity.',
    },
    {
      id: 'experience',
      kind: 'experience',
      title: 'Experience',
      items: [
        {
          role: 'Senior Software Engineer',
          company: 'Splunk Canada Services',
          location: 'Vancouver, BC',
          start: 'Apr 2020',
          end: 'Jan 2024',
          bullets: [
            "Shipped Splunk's Data Stream Processor (DSP) on-prem, enabling an enterprise customer to ingest > 1 PB/day of telemetry data.",
            'Partnered with Product and SRE teams to prioritize performance-vs-cost trade-offs, using KubeCost to cut $5,000/month in cloud spend while maintaining 99.99% uptime.',
            'Defined metrics and dashboards with OTEL + Prometheus to monitor ingestion latency and data reliability; influenced roadmap for observability improvements.',
            'Mentored engineers and drove sprint retrospectives focused on outcome-based metrics.',
            'Stack: Kubernetes, Istio, Consul, GitLab CI/CD, Terraform, Go, AWS, Kafka, Flink, Docker.',
          ],
        },
        {
          role: 'Software Development Engineer in Test',
          company: 'Splunk Canada Services',
          location: 'Vancouver, BC',
          start: 'Feb 2018',
          end: 'Apr 2020',
          bullets: [
            'Built CI/CD pipelines for Splunk Connect for K8S using CircleCI, cutting release validation time by 40%.',
            'Increased automated test coverage for Office 365 TA and AWS TA using Pytest.',
            'Served as Agile Scrum Master, leading backlog grooming and sprint planning across three distributed teams.',
            'Member, Data Availability Testing Guild, promoting test-automation best practices org-wide.',
          ],
        },
        {
          role: 'Software Test Engineer / Engineer in Test',
          company: 'Vision Critical',
          location: 'Vancouver, BC',
          start: 'Oct 2015',
          end: 'Nov 2017',
          bullets: [
            'Led QA feature initiatives, performing risk and requirements analysis to align release scope with product goals.',
            'Extended automated frameworks (ReactJS, KarmaJS, Selenium, NUnit) and CI/CD pipelines (GOCD) to improve regression reliability.',
            'Partnered with PMs and UX to validate survey-responding workflows, improving response accuracy by 12%.',
            'Contributed to internal Hackasite innovation event (C#, ASP.NET MVC, Polymer JS).',
          ],
        },
        {
          role: 'Software Tester',
          company: 'AppNeta',
          location: 'Vancouver, BC',
          start: 'Sep 2013',
          end: 'Dec 2014',
          bullets: [
            'Automated provisioning of network-traffic sequencing drivers for FlowView Software via Chef + Vagrant.',
            'Streamlined QA environment setup, reducing manual test-bed creation time by 60%.',
            'Collaborated with engineering to define monitoring KPIs for flow-analysis accuracy.',
            'Stack: Java, Ruby, Postgres, MongoDB, ElasticSearch, C++, Docker.',
          ],
        },
      ],
    },
    {
      id: 'education',
      kind: 'education',
      title: 'Education',
      items: [
        {
          school: 'Simon Fraser University — Beedie School of Business',
          degree: 'Master of Business Administration (Full-Time)',
          location: 'Vancouver, BC',
          dates: 'Expected July 2026',
          note: 'Focus on Strategy, Innovation, Product Management & Analytics.',
        },
        {
          school: 'University of British Columbia',
          degree: 'Bachelor of Computer Science (Second Degree)',
          location: 'Vancouver, BC',
          dates: '2015',
          note: 'Breadth in Statistics, Data Mining & Machine Learning.',
        },
        {
          school: 'University of British Columbia',
          degree: 'Bachelor of Science — Biology',
          location: 'Vancouver, BC',
          dates: '2011',
          note: 'Concentration in Cell Biology and Genetics; Directed Studies in Neuroscience (ICORD).',
        },
      ],
    },
    {
      id: 'skills',
      kind: 'skills',
      title: 'Core Skills',
      items: [
        'Product Strategy',
        'Agile / Scrum Leadership',
        'Roadmap Planning',
        'Systems Design',
        'Customer Discovery',
        'Data Observability',
        'Cost Optimization',
        'CI/CD',
        'Kubernetes',
        'AWS',
        'Go',
        'Python',
        'Kafka',
        'Terraform',
        'Flink',
        'AI/ML-Driven Insights',
        'Cross-Functional Collaboration',
      ],
    },
    {
      id: 'community',
      kind: 'list',
      title: 'Community & Leadership',
      items: [
        'Member, PilipinX Employee Resource Group, promoting diversity & mentorship in tech.',
        'Hackathon Contributor & Coach — led teams developing observability prototypes using Splunk SDK and React.',
        'Scrum Master Certification — applied Agile principles for cross-team delivery efficiency.',
      ],
    },
    {
      id: 'interests',
      kind: 'skills',
      title: 'Additional Interests',
      items: [
        'AI-driven collaboration tools',
        'Workflow automation',
        'Hybrid work culture optimization',
        'Golf & Sports Analytics',
      ],
    },
  ],
};
