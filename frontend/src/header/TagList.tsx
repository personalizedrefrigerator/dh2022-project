import { useState, useEffect, useMemo } from 'react';
import fetchRoute from '../api/fetchRoute';
import { TagData } from './types';
import Tag from './Tag'

const TagList = () => {
    const [ tagData, setTagData ] = useState<TagData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            let data: TagData[] | undefined;

            try {
                data = await fetchRoute('/tags');///${count}`);
            } catch(e) {
                console.warn('unable to fetch data!', e);
            }

            if (!data) {
                return;
            }
            if (data['length'] === undefined) {
                throw new Error('Not an array');
            }
            
            setTagData(data);
        };
        fetchData();
    }, [setTagData]);

    const tags = useMemo(() => {
        const result = [];
        for (const tag of tagData) {
            const tagProps = {style: {backgroundColor: tag.color},
                                key: tag.id,
                                data: tag.content}
            result.push(
                <Tag {...tagProps}/>
            );
        }
        return result;
    }, [ tagData ]);

    return (
        <div className='TagList'>
            {tags}
        </div>
    );
}

export default TagList;