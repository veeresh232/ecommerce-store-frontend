import React from 'react';
import { API } from '../../backend';
import imgNotFound from '../../assets/images/imgnotfound.jpg'

const ImageHelper = ({product}) => {
    let imageUrl = product? `${API}/product/photo/${product._id}`:imgNotFound;
    return (
        <div className="rounded border border-success p-2">
              <img
                src={imageUrl}
                alt="photo"
                style={{ maxHeight: "100%", maxWidth: "100%" }}
                className="mb-3 rounded"
              />
            </div>
    )
}

export default ImageHelper;
