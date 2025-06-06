import React from 'react'
import ShareIcon from '../icons/ShareIcon'
import PlusIcon from '../icons/PlusIcon'

export const Card = ({ link, title, type }) => {
   return (
      <div>
         <div className='p-4 bg-white rounded-md border border-gray-200 max-w-72 min-h-48'>
            <div className='flex justify-between text-gray-600 items-center'>
               <div className='flex gap-x-2 items-center'>
                  <ShareIcon />
                  {title}
               </div>
               <div className='flex gap-1 items-center'>
                  <div onClick={() => { }}>
                     <a href={link} target='_blank'>
                        <PlusIcon />
                     </a>
                  </div>
                  <div>
                     <ShareIcon />
                  </div>
               </div>
            </div>

            <div className='mt-2'>
               {
                  type === 'youtube' && <iframe className='p-2 object-fit max-w-64'
                     src={link.replace('watch', 'embed').replace('?v=', '/')}
                     title="YouTube video player" frameborder="0"
                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                     referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
                  </iframe>
               }
            </div>
            <div className='mt-2'>
               {
                  type === 'twitter' &&
                  <div>
                     <blockquote class="twitter-tweet">
                        <a href={link}></a>
                     </blockquote>
                     <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
                  </div>
               }
            </div>
         </div>
      </div >
   )
}
