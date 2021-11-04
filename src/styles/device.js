const size = {
  xsm: '320px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  xxl: '1536px',
};

const min = {
  smobile: `(min-width: ${size.xsm})`,
  mobile: `(min-width: ${size.sm})`,
  tablet: `(min-width: ${size.md})`,
  laptop: `(min-width: ${size.lg})`,
  desktop: `(min-width: ${size.xl})`,
  bdesktop: `(min-width: ${size.xxl})`,
};

const max = {
  smobile: `(max-width: ${size.xsm})`,
  mobile: `(max-width: ${size.sm})`,
  tablet: `(max-width: ${size.md})`,
  laptop: `(max-width: ${size.lg})`,
  desktop: `(max-width: ${size.xl})`,
  bdesktop: `(max-width: ${size.xxl})`,
};

const device = {min, max};
export default device;