import 'normalize.css';
import 'react-datetime/css/react-datetime.css';

import {injectGlobal} from 'styled-components';
import OpenSansRegularEot from './fonts/subset-OpenSans-Regular.eot';
import OpenSansRegularTtf from './fonts/subset-OpenSans-Regular.ttf';
import OpenSansRegularWoff from './fonts/subset-OpenSans-Regular.woff';
import OpenSansBoldEot from './fonts/subset-OpenSans-Bold.eot';
import OpenSansBoldTtf from './fonts/subset-OpenSans-Bold.ttf';
import OpenSansBoldWoff from './fonts/subset-OpenSans-Bold.woff';
import IconsTtf from './fonts/icons.ttf';
import IconsWoff from './fonts/icons.woff';
import IconsSvg from './fonts/icons.svg';

injectGlobal`
  @font-face {
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: normal;
    src: url(${OpenSansRegularEot});
    src: local('Open Sans Regular'), local('OpenSans-Regular'),
        url('${OpenSansRegularEot}?#iefix') format('embedded-opentype'),
        url(${OpenSansRegularWoff}) format('woff'),
        url(${OpenSansRegularTtf}) format('truetype');
  }

  @font-face {
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: bold;
    src: url(${OpenSansBoldEot});
    src: local('Open Sans Regular'), local('OpenSans-Regular'),
        url('${OpenSansBoldEot}?#iefix') format('embedded-opentype'),
        url(${OpenSansBoldWoff}) format('woff'),
        url(${OpenSansBoldTtf}) format('truetype');
  }

  @font-face {
    font-family: 'icons';
    font-style: normal;
    font-weight: normal;
    src:
        url(${IconsTtf}) format('truetype'),
        url(${IconsWoff}) format('woff'),
        url(${IconsSvg}) format('svg');
  }

  ::placeholder {
    color: #a5a5a5;
    font-weight: 300;
  }

  .rdtPicker {
    td.rdtActive {
      &,
      &:hover {
        background-color: #214154;
      }
    }
  }
`;
