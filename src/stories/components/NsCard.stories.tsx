import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { NsCard } from '../../components/components/card/NsCard';
import { CardProps } from '@mui/material/Card';
import GetAppIcon from '@mui/icons-material/GetApp';

export default {
  title: 'Components/Card',
  component: NsCard,
} as Meta<CardProps>;

const Template: StoryFn<CardProps> = (args) => {
  return (
    <NsCard {...args} />
  );
};

// Storia: Basic Card
export const BasicCard = Template.bind({});
BasicCard.args = {
  mainText: "Card title",
  subText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sodales mollis rhoncus. Aliquam erat volutpat. Donec odio diam, semper a nisi nec, eleifend feugiat enim. Aenean eu massa venenatis, feugiat eros sed, vulputate tortor.",
  buttons: [
    { label: "Link", onClick: () => console.log("Link clicked!") },
  ],
  cardVariant: "flag"
};

// Storia: Media Card
export const MediaCard = Template.bind({});
MediaCard.args = {
  mediaImage: "./images/ns-abstarct.jpg",
  mediaAlt: "Alt immagine",
  mainText: "Card title",
  subText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sodales mollis rhoncus. Aliquam erat volutpat. Donec odio diam, semper a nisi nec, eleifend feugiat addonec sodales mollis",
  cardVariant: "classic"
};

// Storia: Actions Card
export const ActionsCard = Template.bind({});
ActionsCard.args = {
  mediaImage: "./images/ns-abstarct.jpg",
  mediaAlt: "Alt immagine",
  mainText: "Card title",
  subText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sodales mollis rhoncus. Aliquam erat volutpat. Donec odio diam, semper a nisi nec, eleifend feugiat addonec sodales mollis",
  cardVariant: "classic",
  buttons: [
    { label: "Primary action", onClick: () => console.log("Primary action clicked!") },
    { label: "Secondary action", color: "secondary", onClick: () => console.log("Secondary action clicked!") },
  ]
};

// Storia: Clickable Card
export const ClickableCard = Template.bind({});
ClickableCard.args = {
  icon: <GetAppIcon/>,
  mainText: "New",
  subText: "3 pcaps",
  cardVariant: "clickable"
};