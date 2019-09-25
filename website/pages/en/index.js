/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

class HomeSplash extends React.Component {
  render() {
    const {siteConfig, language = ''} = this.props;
    const {baseUrl, docsUrl} = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;


    const SplashContainer = props => (
      <div className="homeContainer">
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">{props.children}</div>
        </div>
      </div>
    );

      const ProjectTitle = props => (
        <div>
          <img style={{ width: "40em", paddingBottom: "1em" }} src={`${baseUrl}img/cb_logo.svg`} />
          <h2 className="projectTitle">
            {/* {siteConfig.title} */}
            <small>{siteConfig.tagline}</small>
          </h2>
        </div>
      );

    // const Logo = props => (
    //   <div className="projectLogo">
    //     <img src={props.img_src} alt="Project Logo" />
    //   </div>
    // );
    //
    // const ProjectTitle = () => (
    //   <h2 className="projectTitle">
    //     {siteConfig.title}
    //     <small>{siteConfig.tagline}</small>
    //   </h2>
    // );

    const PromoSection = props => (
      <div className="section promoSection">
        <div className="promoRow">
          <div className="pluginRowBlock">{props.children}</div>
        </div>
      </div>
    );

    const Button = props => (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={props.href} target={props.target}>
          {props.children}
        </a>
      </div>
    );

    return (
      <SplashContainer>
        <div className="inner">
          <ProjectTitle siteConfig={siteConfig} />
          <PromoSection>
            <Button href='https://github.com/Cloudbox/Cloudbox/wiki'>Get Started</Button>
          </PromoSection>
        </div>
      </SplashContainer>
    );
  }
}

class Index extends React.Component {
  render() {
    const {config: siteConfig, language = ''} = this.props;
    const {baseUrl} = siteConfig;

    const Block = props => (
      <Container
        padding={['bottom', 'top']}
        id={props.id}
        background={props.background}>
        <GridBlock
          align="center"
          contents={props.children}
          layout={props.layout}
        />
      </Container>
    );

    const Features = props => (
    	<div id="feature">
    		<Block layout="fourColumn">
    			{[
            {
              image: `${baseUrl}img/lightning.svg`,
              imageAlign: "top",
              title: "Fast Deployment",
              content:
                "Ansible allows for fast deployment of the Cloudbox server stack solution with minimal setup and in as little as 15 minutes.<br /><br /><br /><br />"
            },
            {
              image: `${baseUrl}img/gear.svg`,
              imageAlign: "top",
              title: "Automation",
              content:
                "Cloudbox puts \"all the pieces together\" by automating server tasks, performance tweaks, and application setup, right out-of-the-box."
            },
            {
              image: `${baseUrl}img/docker.svg`,
              imageAlign: "top",
              title: "Docker",
              content:
                "Applications in Docker containers are isolated from each other and allow for quick installs and easy uninstalls."
            },
            {
              image: `${baseUrl}img/window.svg`,
              imageAlign: "top",
              title: "Open Source",
              content:
                "Free and open source software (FOSS). Collaborate on ideas and improvements. Build and share add-ons on the \'Community\' repository."
            },
            {
              image: `${baseUrl}img/cloud.svg`,
              imageAlign: "top",
              title: "Cloud Storage",
              content:
                "Store media on cloud storage to free up on local storage space."
            },
    				{
    					image: `${baseUrl}img/browser.svg`,
    					imageAlign: "top",
    					title: "Your Domain Name",
    					content:
    						"Use a domain name to access your server applications securely with SSL certificates from Let's Encrypt."
    				},
            {
              image: `${baseUrl}img/clock.svg`,
              imageAlign: "top",
              title: "Backup & Restore",
              content:
                "Create backups directly on the cloud. Easily migrate to any server using the restore function."
            },
            {
              image: `${baseUrl}img/contacts.svg`,
              imageAlign: "top",
              title: "Active Community",
              content:
                "Engage with a large community of helpful members who share similar interests as you. Extend functionality by utilizing add-ons created by other members."
            }
    			]}
    		</Block>
    	</div>
    );

    return (
      <div>
        <HomeSplash siteConfig={siteConfig} language={language} />
        <div className="mainContainer">
          <Features />
        </div>
      </div>
    );
  }
}

Index.description = 'Cloudbox is an Ansible-based solution for rapidly deploying a Dockerized cloud media server.';

module.exports = Index;
