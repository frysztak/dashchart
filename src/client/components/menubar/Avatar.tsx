import React from 'react';
import Safariman from '../../assets/icons/safariman.svg';
import { Image } from 'rebass';

export interface AvatarProps {
  size: string;
  onClick: () => void;
}

export function Avatar(props: AvatarProps) {
  return <Image src={Safariman} variant={'avatar'} size={props.size} onClick={props.onClick} />;
}
