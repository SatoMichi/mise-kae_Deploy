import React, { useEffect, useState } from 'react';
import { Pose } from '../utils/Pose';
import { PoseDefinition } from '../utils/PoseFileManager';

interface PoseListProps {
  onPoseSelect?: (pose: PoseDefinition) => void;
}

export const PoseList: React.FC<PoseListProps> = ({ onPoseSelect }) => {
  const [poses, setPoses] = useState<PoseDefinition[]>([]);
  const [selectedPose, setSelectedPose] = useState<string | null>(null);

  useEffect(() => {
    const pose = Pose.getInstance();
    setPoses(pose.getAllPoses());
  }, []);

  const handlePoseSelect = (poseDef: PoseDefinition) => {
    setSelectedPose(poseDef.name);
    onPoseSelect?.(poseDef);
  };

  const handlePoseDelete = (poseName: string) => {
    const pose = Pose.getInstance();
    pose.deletePose(poseName);
    setPoses(pose.getAllPoses());
    if (selectedPose === poseName) {
      setSelectedPose(null);
    }
  };

  if (poses.length === 0) {
    return (
      <div className="text-center text-gray-500 py-4">
        保存されているポーズはありません
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {poses.map((poseDef) => (
        <div
          key={poseDef.name}
          className={`flex items-center justify-between p-3 rounded-lg border
            ${selectedPose === poseDef.name
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-blue-300'
            }`}
        >
          <button
            className="flex-1 text-left"
            onClick={() => handlePoseSelect(poseDef)}
          >
            <div className="font-medium text-gray-900">{poseDef.name}</div>
            <div className="text-sm text-gray-500">{poseDef.description}</div>
          </button>
          <button
            className="ml-2 p-1 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100"
            onClick={() => handlePoseDelete(poseDef.name)}
            title="ポーズを削除"
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
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}; 
