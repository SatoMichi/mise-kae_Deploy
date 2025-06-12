import React, { useCallback, useState, useRef } from 'react';
import { Pose } from '../utils/Pose';
import { PoseDefinition } from '../utils/PoseFileManager';

interface PoseUploaderProps {
  onPoseLoaded?: (pose: PoseDefinition) => void;
}

export const PoseUploader: React.FC<PoseUploaderProps> = ({ onPoseLoaded }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = useCallback(async (file: File) => {
    try {
      setError(null);
      setSelectedFile(file);
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        try {
          const content = e.target?.result as string;
          const pose = Pose.getInstance();
          
          // 一時的なBlob URLを作成
          const blob = new Blob([content], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          
          // ポーズを読み込む
          await pose.loadPoseFromFile(url);
          
          // ポーズ名を生成（ファイル名から）
          const fileName = file.name.replace('.json', '');
          const poseName = fileName
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase())
            .trim();
          
          const poseDef: PoseDefinition = {
            name: poseName,
            description: `${poseName}のポーズ`,
            pose: pose.getCurrentPose()
          };
          
          // ポーズを保存
          pose.savePose(poseName, poseDef.description);
          
          // コールバックを呼び出し
          onPoseLoaded?.(poseDef);
          
          // Blob URLを解放
          URL.revokeObjectURL(url);
        } catch (err) {
          setError('ポーズの読み込みに失敗しました: ' + (err as Error).message);
          setSelectedFile(null);
        }
      };
      
      reader.onerror = () => {
        setError('ファイルの読み込みに失敗しました');
        setSelectedFile(null);
      };
      
      reader.readAsText(file);
    } catch (err) {
      setError('ファイルの処理に失敗しました: ' + (err as Error).message);
      setSelectedFile(null);
    }
  }, [onPoseLoaded]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.name.endsWith('.json')) {
      handleFileUpload(file);
    } else {
      setError('JSONファイルのみアップロード可能です');
    }
  }, [handleFileUpload]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.name.endsWith('.json')) {
      handleFileUpload(file);
    } else {
      setError('JSONファイルのみアップロード可能です');
    }
  }, [handleFileUpload]);

  const handleButtonClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleClearFile = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      {/* メインのファイル選択ボタン */}
      <div
        className={`relative flex flex-col items-center justify-center p-6 rounded-lg border-2
          ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
          ${error ? 'border-red-500' : ''}
          ${selectedFile ? 'bg-gray-50' : 'hover:border-blue-400 cursor-pointer'}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={!selectedFile ? handleButtonClick : undefined}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          className="hidden"
          onChange={handleFileInput}
        />
        
        {selectedFile ? (
          <div className="w-full">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <svg
                  className="w-8 h-8 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <div className="text-left">
                  <div className="font-medium text-gray-900">{selectedFile.name}</div>
                  <div className="text-sm text-gray-500">
                    {(selectedFile.size / 1024).toFixed(1)} KB
                  </div>
                </div>
              </div>
              <button
                className="p-1 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100"
                onClick={handleClearFile}
                title="ファイルをクリア"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        ) : (
          <>
            <svg
              className="w-12 h-12 text-gray-400 mb-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <div className="text-center">
              <div className="text-lg font-medium text-gray-900 mb-1">
                ポーズファイルを選択
              </div>
              <div className="text-sm text-gray-500">
                JSONファイルを選択してください
              </div>
            </div>
          </>
        )}
      </div>

      {/* ドラッグ&ドロップのヒント */}
      {!selectedFile && (
        <div className="text-center text-sm text-gray-500">
          または、ここにファイルをドラッグ＆ドロップ
        </div>
      )}

      {/* エラーメッセージ */}
      {error && (
        <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
          {error}
        </div>
      )}
    </div>
  );
}; 
