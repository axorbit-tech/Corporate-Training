import React from 'react';


interface GalleryProps {
    eventImages?: string[]; // array of image URLs
}

const Gallery: React.FC<GalleryProps> = ({ eventImages = [] }) => {

    if (eventImages.length === 0) {
        return <p className="text-center text-gray-500">No images available</p>;
    }


    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mx-10 mt-10 md:mt-0">
            {eventImages.map((img, index) => (
                <div key={index}>
                    <img
                        className="w-full h-48 md:h-80 object-cover rounded-lg"
                        src={img}
                        alt={`event-img-${index}`}
                    />
                </div>
            ))}
        </div>
    );
};

export default Gallery;
