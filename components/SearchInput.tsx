'use client';

import { formUrlQuery, removeKeysFromUrlQuery } from '@jsmastery/utils';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const SearchInput = () => {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const [search, setSearch] = useState('');

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (search) {
                const newUrl = formUrlQuery({
                    params: searchParams.toString(),
                    key: 'topic',
                    value: search,
                });
                router.push(newUrl, { scroll: false });
            } else {
                if (pathname === '/Learning') {
                    const newUrl = removeKeysFromUrlQuery({
                        params: searchParams.toString(),
                        keysToRemove: ['topic'],
                    });
                    router.push(newUrl, { scroll: false });
                }
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [search, searchParams, pathname, router]);

    return (
        <div className='relative border border-black rounded-lg items-center flex gap-2 px-2 py-1'>
            <Image 
                src="/icons/search.svg" 
                width={15} 
                height={15} 
                alt="Search icon" 
            />
            <input 
                placeholder='Search Learnings..' 
                className='outline-none' 
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
                type="text" 
            />
        </div>
    );
};

export default SearchInput;