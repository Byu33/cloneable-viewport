declare module 'react-native-vector-icons/Feather' {
  import { Component } from 'react';
  import { ViewProps } from 'react-native';

  interface IconProps extends ViewProps {
    name: string;
    size?: number;
    color?: string;
  }

  class Icon extends Component<IconProps> {}

  export default Icon;
} 