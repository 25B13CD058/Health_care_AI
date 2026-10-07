import React, { useState } from 'react';
import { 
  FileText, Upload, Sparkles, Filter, FileSpreadsheet, Eye, 
  CheckCircle2, Plus, Calendar, ShieldCheck, FileCheck
} from 'lucide-react';
import { HealthRecord } from '../types';
import { useApp } from '../context/AppContext';
import { generateReportSummary } from '../services/aiService';

export const HealthRecords: React.FC = () => {
  const { healthRecords, addHealthRecord, setReportSummaryModal } = useApp();
  
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [isUploading, setIsUploading] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<HealthRecord['type']>('Blood Test');

  const recordTypes: HealthRecord['type'][] = ['Blood Test', 'Prescription', 'X-Ray', 'MRI', 'CT Scan', 'Lab Report'];

  const filteredRecords = healthRecords.filter(rec => 
    selectedFilter === 'All' || rec.type === selectedFilter
  );

  const handleSimulateUpload = () => {
    if (!newTitle.trim()) return;

    setIsUploading(true);
    setTimeout(() => {
      const summaryObj = generateReportSummary(newTitle).summary;
      addHealthRecord(newTitle, newType, summaryObj);
      setNewTitle('');
      setIsUploading(false);
    }, 600);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-teal-950 border border-teal-500/30 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <FileText className="w-7 h-7 text-teal-400" />
            <span>Health Records Vault</span>
          </h1>
          <p className="text-sm text-slate-300 mt-1">
            Store prescriptions, blood panels, and imaging scans safely with instant educational AI Report Summaries.
          </p>
        </div>

        {/* Demo Disclaimer */}
        <div className="bg-navy-950/80 p-2.5 rounded-xl border border-navy-700 text-[11px] text-slate-400 max-w-xs flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
          <span>Encrypted Vault • DEMO Medical Reports</span>
        </div>
      </div>

      {/* Upload Box & Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Upload Demo Box */}
        <div className="lg:col-span-1 bg-navy-900 border border-navy-700 rounded-2xl p-5 shadow-xl space-y-4">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <Upload className="w-4 h-4 text-teal-400" />
            <span>Upload New Document</span>
          </h3>

          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Document Title:</label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Annual Blood Panel 2026..."
                className="w-full bg-navy-950 border border-navy-700 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Category:</label>
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value as any)}
                className="w-full bg-navy-950 border border-navy-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-teal-500 cursor-pointer"
              >
                {recordTypes.map(t => (
                  <option key={t} value={t} className="bg-navy-900 text-white">{t}</option>
                ))}
              </select>
            </div>

            {/* Drop Zone Box */}
            <div className="border-2 border-dashed border-navy-700 hover:border-teal-500/50 bg-navy-950/60 rounded-xl p-6 text-center space-y-2 cursor-pointer transition">
              <FileSpreadsheet className="w-8 h-8 mx-auto text-teal-400" />
              <p className="text-xs font-bold text-slate-200">Drag & drop report or click to browse</p>
              <p className="text-[10px] text-slate-400">PDF, JPG, PNG up to 10MB (Demo Upload)</p>
            </div>

            <button
              onClick={handleSimulateUpload}
              disabled={isUploading || !newTitle.trim()}
              className="w-full py-2.5 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-navy-950 font-black text-xs rounded-xl transition shadow-md disabled:opacity-50 flex items-center justify-center gap-1.5"
            >
              {isUploading ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span>Processing AI Summary...</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Upload & Generate AI Summary</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* List of Records */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none bg-navy-900 border border-navy-700 p-3 rounded-2xl shadow-xl">
            <span className="text-xs font-bold text-slate-400 shrink-0 mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-teal-400" /> Filter:
            </span>
            {['All', ...recordTypes].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-xl whitespace-nowrap transition border ${
                  selectedFilter === cat 
                    ? 'bg-teal-500/20 text-teal-300 border-teal-500/50' 
                    : 'bg-navy-950 text-slate-400 border-navy-800 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Record Cards */}
          <div className="space-y-3">
            {filteredRecords.map(record => (
              <div 
                key={record.id} 
                className="bg-navy-900 border border-navy-700 hover:border-teal-500/50 rounded-2xl p-4 shadow-xl transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 shrink-0">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-white">{record.title}</h4>
                      <span className="text-[10px] font-bold bg-navy-950 text-teal-300 border border-navy-800 px-2 py-0.5 rounded">
                        {record.type}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-2">
                      <span>Uploaded: {record.uploadedDate}</span>
                      <span>•</span>
                      <span>{record.fileSize}</span>
                      {record.doctorName && (
                        <>
                          <span>•</span>
                          <span className="text-slate-300">{record.doctorName}</span>
                        </>
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  {record.summary && (
                    <button
                      onClick={() => setReportSummaryModal(record)}
                      className="px-3 py-2 bg-gradient-to-r from-teal-500/20 to-teal-600/20 border border-teal-500/40 text-teal-300 hover:bg-teal-500/30 font-bold text-xs rounded-xl transition flex items-center gap-1.5 shadow-sm"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                      <span>Explain This Report</span>
                    </button>
                  )}
                  <button
                    onClick={() => setReportSummaryModal(record)}
                    className="px-3 py-2 bg-navy-800 hover:bg-navy-700 text-slate-200 font-semibold text-xs rounded-xl transition border border-navy-700 flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Report</span>
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
};
