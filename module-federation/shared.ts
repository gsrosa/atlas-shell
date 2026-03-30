export const shared = {
  '@gsrosa/atlas-ui': {
    singleton: true,
    requiredVersion: false as const,
  },
  react: {
    singleton: true,
    requiredVersion: '^19.0.0',
  },
  'react-dom': {
    singleton: true,
    requiredVersion: '^19.0.0',
  },
  'lucide-react': {
    singleton: true,
    requiredVersion: '^1.7.0',
  },
  'react-router-dom': {
    singleton: true,
    requiredVersion: '^7.0.0',
  },
  '@tanstack/react-query': {
    singleton: true,
    requiredVersion: '^5.0.0',
  },
  zustand: {
    singleton: true,
    requiredVersion: '^5.0.0',
  },
};
