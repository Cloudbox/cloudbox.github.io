/**
 * Copyright (c) 2017-present, Cloudbox
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

function Help(props) {
  const {config: siteConfig, language = ''} = props;
  const {baseUrl, docsUrl} = siteConfig;
  const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
  const langPart = `${language ? `${language}/` : ''}`;
  const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

  const supportLinks = [
    {
      title: 'Browse Docs',
      content: 'Learn more about Cloudbox using the [wiki](https://github.com/Cloudbox/Cloudbox/wiki).'
    },
    {
      title: 'Join the community',
      content: 'Ask questions and be part of the [discussion](https://discord.io/cloudbox).'
    },
    {
      title: 'Stay up to date',
      content: 'Find out what\'s [new](https://github.com/Cloudbox/Cloudbox/blob/master/CHANGELOG.md) with this project.',
    },
  ];

  return (
    <div className="docMainWrapper wrapper">
      <Container className="mainContainer documentContainer postContainer">
        <div className="post">
          <header className="postHeader">
            <h1>Need help?</h1>
          </header>
          <p>This project is maintained by a group of volunteers.</p>
          <GridBlock contents={supportLinks} layout="threeColumn" />
        </div>
      </Container>
    </div>
  );
}

module.exports = Help;
