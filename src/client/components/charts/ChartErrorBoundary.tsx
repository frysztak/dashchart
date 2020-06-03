import React, { Component } from 'react';
import { ErrorMessage } from '../misc/ErrorMessage';

interface Props {
  children: JSX.Element | JSX.Element[];
}

interface State {
  error: Error | null;
}

export class ChartErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return <ErrorMessage message={this.state.error.message} />;
    }
    return this.props.children;
  }
}
