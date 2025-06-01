'use client'

import { DocumentArrowUpIcon, DocumentTextIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

interface UploadedFile {
    id: string
    name: string
    size: number
    progress: number
    status: 'uploading' | 'completed' | 'error'
}

export default function CVUploadPage() {
    const router = useRouter()
    const [files, setFiles] = useState<UploadedFile[]>([])
    const [isUploading, setIsUploading] = useState(false)

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const newFiles = acceptedFiles.map(file => ({
            id: Math.random().toString(36).substring(7),
            name: file.name,
            size: file.size,
            progress: 0,
            status: 'uploading' as const
        }))
        setFiles(prev => [...prev, ...newFiles])
        // TODO: Implement actual file upload logic
        simulateUpload(newFiles)
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf'],
            'application/msword': ['.doc'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
        },
        maxSize: 5242880, // 5MB
    })

    const simulateUpload = (newFiles: UploadedFile[]) => {
        setIsUploading(true)
        newFiles.forEach(file => {
            let progress = 0
            const interval = setInterval(() => {
                progress += 10
                setFiles(prev => prev.map(f =>
                    f.id === file.id
                        ? { ...f, progress: Math.min(progress, 100) }
                        : f
                ))
                if (progress >= 100) {
                    clearInterval(interval)
                    setFiles(prev => prev.map(f =>
                        f.id === file.id
                            ? { ...f, status: 'completed' }
                            : f
                    ))
                }
            }, 200)
        })
        setIsUploading(false)
    }

    const removeFile = (id: string) => {
        setFiles(prev => prev.filter(f => f.id !== id))
    }

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes'
        const k = 1024
        const sizes = ['Bytes', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Upload CVs</h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Upload multiple CVs in PDF or DOC format for AI-powered screening
                    </p>
                </div>

                {/* Upload Area */}
                <div
                    {...getRootProps()}
                    className={`mt-4 flex justify-center rounded-lg border-2 border-dashed border-gray-300 px-6 py-10 ${isDragActive ? 'border-blue-500 bg-blue-50' : ''
                        }`}
                >
                    <div className="text-center">
                        <DocumentArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="mt-4 flex text-sm text-gray-600">
                            <input {...getInputProps()} />
                            <p className="pl-1">
                                Drag and drop CVs here, or{' '}
                                <span className="text-blue-600 hover:text-blue-500 cursor-pointer">
                                    browse
                                </span>
                            </p>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                            PDF, DOC, or DOCX up to 5MB
                        </p>
                    </div>
                </div>

                {/* File List */}
                {files.length > 0 && (
                    <div className="mt-8">
                        <h2 className="text-lg font-medium text-gray-900 mb-4">
                            Uploaded Files
                        </h2>
                        <ul className="divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white">
                            {files.map((file) => (
                                <li key={file.id} className="px-6 py-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <DocumentTextIcon className="h-6 w-6 text-gray-400" />
                                            <div className="ml-4">
                                                <p className="text-sm font-medium text-gray-900">
                                                    {file.name}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {formatFileSize(file.size)}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            {file.status === 'uploading' && (
                                                <div className="w-32">
                                                    <div className="h-2 bg-gray-200 rounded-full">
                                                        <div
                                                            className="h-2 bg-blue-600 rounded-full transition-all duration-300"
                                                            style={{ width: `${file.progress}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                            <button
                                                onClick={() => removeFile(file.id)}
                                                className="text-gray-400 hover:text-gray-500"
                                            >
                                                <XMarkIcon className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="mt-8 flex justify-end space-x-4">
                    <button
                        onClick={() => router.push('/company/dashboard')}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        disabled={files.length === 0 || isUploading}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isUploading ? 'Uploading...' : 'Process CVs'}
                    </button>
                </div>
            </div>
        </div>
    )
} 