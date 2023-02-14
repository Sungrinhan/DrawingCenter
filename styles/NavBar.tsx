import styled from '@emotion/styled';
import { Global, css } from '@emotion/react';
import Link from 'next/link';

const colors = {
  active: 'tomato',
};

export const LinkButton = styled(Link)`
  margin: 10px;
  .active {
    color: tomato;
  }
`;
