import {injectGlobal} from 'styled-components';
import 'normalize.css';
import OpenSansRegularEot from './fonts/subset-OpenSans-Regular.eot';
import OpenSansRegularTtf from './fonts/subset-OpenSans-Regular.ttf';
import OpenSansRegularWoff from './fonts/subset-OpenSans-Regular.woff';
import OpenSansBoldEot from './fonts/subset-OpenSans-Bold.eot';
import OpenSansBoldTtf from './fonts/subset-OpenSans-Bold.ttf';
import OpenSansBoldWoff from './fonts/subset-OpenSans-Bold.woff';

injectGlobal`
  @font-face {
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: normal;
    src: url(${OpenSansRegularEot});
    src: local('Open Sans Regular'), local('OpenSans-Regular'),
        url(${OpenSansRegularEot}?#iefix') format('embedded-opentype'),
        url(${OpenSansRegularWoff}) format('woff'),
        url(${OpenSansRegularTtf}) format('truetype');
  }

  @font-face {
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: bold;
    src: url(${OpenSansBoldEot});
    src: local('Open Sans Regular'), local('OpenSans-Regular'),
        url(${OpenSansBoldEot}?#iefix') format('embedded-opentype'),
        url(${OpenSansBoldWoff}) format('woff'),
        url(${OpenSansBoldTtf}) format('truetype');
  }
`;
