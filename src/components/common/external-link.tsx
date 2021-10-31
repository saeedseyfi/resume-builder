import { Link, LinkProps } from '@mui/material';

export const ExternalLink: React.FC<LinkProps> = ({ ...props }) => (
  <Link rel="noopener" {...props} />
);
