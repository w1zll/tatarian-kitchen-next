'use client';

import { siteConfig } from '@/config/site.config';
import { usePathname } from 'next/navigation';
import React from 'react';

type Props = {};

const PageContent = (props: Props) => {
   const pathname = usePathname();

   const pageContent =
      siteConfig.pagesContent[pathname as keyof typeof siteConfig.pagesContent]
         ?.content;
   if (!pageContent) {
      return <div>Страница не найдена</div>;
   }
   return <p>{pageContent}</p>;

};

export default PageContent;
