import { useMemo } from 'react';
import { TagData } from '../helper/types';
import Tag from './Tag'
import useData from '../helper/useData';

const TagList = () => {
    const tagData = useData<TagData>('/tags')

    const tags = useMemo(() => {
        const result = [];
        for (const tag of tagData) {
            const tagProps = {style: {backgroundColor: tag.color},
                                key: tag.tagId,
                                data: tag.tagName}
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