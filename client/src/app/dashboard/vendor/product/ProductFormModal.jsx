"use client";

import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { CreateProduct, UpdateProduct } from './action';

const CATEGORIES = ['Electronics','Clothing','Home & Kitchen','Books','Beauty & Care','Sports','Food & Groceries','Other'];

const validationSchema = (isEdit) => Yup.object().shape({
  title: Yup.string().required('Product title is required').min(3, 'Title must be at least 3 characters'),
  description: Yup.string().required('Description is required').min(10, 'Description must be at least 10 characters'),
  price: Yup.number().required('Price is required').positive('Price must be a positive number'),
  stock: Yup.number().required('Stock quantity is required').integer('Stock must be a whole number').min(0, 'Stock cannot be negative'),
  category: Yup.string().required('Please select a category'),
  images: isEdit
    ? Yup.array()
    : Yup.array().min(1, 'Please upload at least one image').required('Please upload at least one image'),
});

export default function ProductFormModal({ isOpen, onClose, product, onSuccess }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const isEdit = !!product;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: product?.title || '',
      description: product?.description || '',
      price: product?.price || '',
      stock: product?.stock || '',
      category: product?.category || '',
      images: product?.images ? product.images.map(url => ({ type: 'existing', url })) : []
    },
    validationSchema: validationSchema(isEdit),
    onSubmit: async (values) => {
      setErrorMsg("");
      setIsSubmitting(true);
      try {
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('description', values.description);
        formData.append('price', values.price);
        formData.append('stock', values.stock);
        formData.append('category', values.category);
      

        // Append new images
        const newFiles = values.images.filter(img => img.type === 'new');
        newFiles.forEach(img => formData.append('images', img.file));

        // Append remaining existing images
        const existingImageUrls = values.images
          .filter(img => img.type === 'existing')
          .map(img => img.url);
        existingImageUrls.forEach(url => formData.append('images', url));
         console.log([...formData.entries()]);

        let res;
        if (isEdit) {
          res = await UpdateProduct(product._id, formData);
        } else {
          res = await CreateProduct(formData);
        }

        if (res.success) {
          onSuccess();
          handleClose();
        } else {
          setErrorMsg(res.error || `Failed to ${isEdit ? 'update' : 'create'} product.`);
        }
      } catch (err) {
        console.error(err);
        setErrorMsg(`Failed to ${isEdit ? 'update' : 'create'} product due to server error.`);
      } finally {
        setIsSubmitting(false);
      }
    }
  });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const currentImages = formik.values.images;
    const remaining = 5 - currentImages.length;
    if (remaining <= 0) {
      alert("You can upload a maximum of 5 images.");
      return;
    }
    const toAdd = files.slice(0, remaining);
    const newItems = toAdd.map(f => ({
      type: 'new',
      url: URL.createObjectURL(f),
      file: f
    }));
    formik.setFieldValue('images', [...currentImages, ...newItems]);
    e.target.value = null;
  };

  const handleRemoveImage = (idx) => {
    const currentImages = [...formik.values.images];
    const itemToRemove = currentImages[idx];
    if (itemToRemove.type === 'new') {
      URL.revokeObjectURL(itemToRemove.url);
    }
    currentImages.splice(idx, 1);
    formik.setFieldValue('images', currentImages);
  };

  const handleClose = () => {
    formik.values.images.forEach(img => {
      if (img.type === 'new') {
        URL.revokeObjectURL(img.url);
      }
    });
    formik.resetForm();
    setErrorMsg("");
    onClose();
  };

  if (!isOpen) return null;

  const headingText = isEdit ? "Edit Product" : "Add New Product";
  const subheadingText = isEdit ? "Update your product listing details" : "Configure your product listing details";
  const submitButtonText = isSubmitting 
    ? (isEdit ? "Saving..." : "Creating...")
    : (isEdit ? "Save Changes" : "Create Product");
  const primaryButtonColor = isEdit ? "bg-blue-500 hover:bg-blue-600 focus:ring-blue-100" : "bg-emerald-500 hover:bg-emerald-600 focus:ring-emerald-100";
  const labelBgHover = isEdit ? "hover:border-blue-400 hover:bg-blue-50/20" : "hover:border-emerald-400 hover:bg-emerald-50/20";
  const fieldFocusClass = isEdit ? "focus:ring-blue-100 focus:border-blue-400" : "focus:ring-emerald-100 focus:border-emerald-400";

  const fieldClass = (name) =>
    `w-full px-4 py-3 bg-gray-50 border rounded-xl text-sm focus:outline-none transition-all duration-200 ${
      formik.touched[name] && formik.errors[name]
        ? 'border-red-400 focus:bg-white focus:ring-2 focus:ring-red-100'
        : `border-gray-200 focus:bg-white focus:ring-2 ${fieldFocusClass}`
    }`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 w-full max-w-xl max-h-[90vh] overflow-y-auto flex flex-col relative animate-fade-in">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{headingText}</h2>
            <p className="text-xs text-gray-500 mt-1">{subheadingText}</p>
          </div>
          <button onClick={handleClose} type="button" className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition cursor-pointer">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={formik.handleSubmit} className="p-6 space-y-6">
          {errorMsg && (
            <div className="p-3.5 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-xs font-semibold">{errorMsg}</div>
          )}

          <div className="space-y-1.5">
            <label htmlFor="title" className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Product Title</label>
            <input
              id="title" name="title" type="text"
              placeholder="e.g. Premium Leather Jacket"
              className={fieldClass('title')}
              onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.title}
            />
            {formik.touched.title && formik.errors.title && (
              <span className="text-xs text-red-500 font-medium block mt-1">{formik.errors.title}</span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="price" className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Price (₹)</label>
              <input
                id="price" name="price" type="number" step="0.01" placeholder="0.00"
                className={fieldClass('price')}
                onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.price}
              />
              {formik.touched.price && formik.errors.price && (
                <span className="text-xs text-red-500 font-medium block mt-1">{formik.errors.price}</span>
              )}
            </div>
            <div className="space-y-1.5">
              <label htmlFor="stock" className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Stock Quantity</label>
              <input
                id="stock" name="stock" type="number" placeholder="10"
                className={fieldClass('stock')}
                onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.stock}
              />
              {formik.touched.stock && formik.errors.stock && (
                <span className="text-xs text-red-500 font-medium block mt-1">{formik.errors.stock}</span>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="category" className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Category</label>
            <select
              id="category" name="category"
              className={fieldClass('category')}
              onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.category}
            >
              <option value="" disabled>Select category</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            {formik.touched.category && formik.errors.category && (
              <span className="text-xs text-red-500 font-medium block mt-1">{formik.errors.category}</span>
            )}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="description" className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Description</label>
            <textarea
              id="description" name="description" rows="3"
              placeholder="Describe your product specs, materials, details etc."
              className={fieldClass('description')}
              onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.description}
            />
            {formik.touched.description && formik.errors.description && (
              <span className="text-xs text-red-500 font-medium block mt-1">{formik.errors.description}</span>
            )}
          </div>

          <div className="space-y-2.5">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Product Images (1–5)</label>
            <div className="flex flex-wrap gap-3">
              {formik.values.images.length < 5 && (
                <label
                  htmlFor="modalImages"
                  className={`w-20 h-20 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center cursor-pointer transition select-none ${labelBgHover}`}
                >
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                  <span className="text-[10px] text-gray-400 font-semibold mt-1">
                    {isEdit ? "Add" : "Upload"}
                  </span>
                </label>
              )}
              {formik.values.images.map((item, idx) => (
                <div key={idx} className="relative w-20 h-20 rounded-xl overflow-hidden border border-gray-100 group/img shadow-sm flex-shrink-0">
                  <img src={item.url} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute top-1.5 right-1.5 p-1 bg-black/60 hover:bg-red-500 text-white rounded-full transition shadow"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
            <input
              id="modalImages"
              name="images"
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            {formik.touched.images && formik.errors.images && (
              <span className="text-xs text-red-500 font-medium block mt-1">{formik.errors.images}</span>
            )}
          </div>

          <div className="flex gap-4 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 py-3 border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold rounded-xl text-sm transition cursor-pointer select-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex-1 py-3 text-white font-semibold rounded-xl text-sm transition disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer select-none ${primaryButtonColor}`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  <span>{submitButtonText}</span>
                </>
              ) : (
                <span>{submitButtonText}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
