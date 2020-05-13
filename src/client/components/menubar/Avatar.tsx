import React from 'react';
import Safariman from '../../assets/icons/safariman.svg';
import { Image } from 'rebass';

export function Avatar() {
  return <Image src={Safariman} variant={'avatar'} size={'32px'} />;
}
