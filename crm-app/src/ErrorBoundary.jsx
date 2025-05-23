import { Component } from 'react';
import PropTypes from 'prop-types';
import "./App.css";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by ErrorBoundary: ', error, errorInfo);
  }

  handleRetry = () => {
    window.location.reload();
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="" style={styles.container}>
          <h2>Oops! Something went wrong.</h2>
          <p>{`We're working on fixing the issue. Please try again later.`}</p>
          <button style={styles.retryButton} onClick={this.handleRetry}>
            Retry
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = {
  container: {
    marginLeft:"",
    textAlign: 'center',
    padding: '10%',
    color: '#a46eda',
  },
  retryButton: {
    margin:'10px',
    padding: '10px 20px',
    backgroundColor: '#a46ede',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default ErrorBoundary;
