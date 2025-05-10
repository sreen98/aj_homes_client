import * as React from 'react';
import { SVGComponentProps } from '../types';
const SvgComponent = ({
  title,
  ...props
}: SVGComponentProps) => <svg width={682.667} height={682.667} viewBox="0 0 512 512" focusable="false" {...props} />;
export default SvgComponent;