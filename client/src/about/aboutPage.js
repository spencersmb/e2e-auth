import React from 'react';

//HMR only works when a parent is a class and not a stateless component
// This could be a stateless component
class AboutPage extends React.Component {
  render() {
    return (
      <div>
        <h1>About</h1>
        <p>This application uses React, Redux, React ROuter and a variety of other helpful libraries.</p>
      </div>
    );
  }
}
export default AboutPage;
