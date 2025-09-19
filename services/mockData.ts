import { Department, EquipmentStatus, RiskLevel } from '../types';
import type { Equipment } from '../types';

const today = new Date();
const daysAgo = (days: number) => new Date(today.getTime() - days * 24 * 60 * 60 * 1000);

// This function calculates a last service date so that the next service is due in ~2.5 hours
const createUrgentServiceDate = (maintenanceIntervalDays: number): Date => {
  const urgentServiceDueDate = new Date();
  urgentServiceDueDate.setHours(urgentServiceDueDate.getHours() + 2, urgentServiceDueDate.getMinutes() + 30); // 2.5 hours from now

  const lastServiceDate = new Date(urgentServiceDueDate);
  lastServiceDate.setDate(lastServiceDate.getDate() - maintenanceIntervalDays);
  return lastServiceDate;
}

export const MOCK_EQUIPMENT: Equipment[] = [
  {
    id: 'eq-001',
    name: 'Ventilator',
    model: 'Respira Pro X',
    serialNumber: 'SN-A12345',
    department: Department.ICU,
    location: 'ICU, Bed 4',
    purchaseDate: daysAgo(730),
    installationDate: daysAgo(720),
    manufacturer: 'MedTech Inc.',
    status: EquipmentStatus.NeedsMaintenance,
    inventoryCode: 'ICU-VNT-01',
    maintenanceHistory: [
      { id: 'log-001a', date: daysAgo(180), technician: 'John Doe', workPerformed: 'Preventive Maintenance', partsUsed: ['Air Filter'], notes: 'Routine check, replaced filter.', status: EquipmentStatus.Operational },
      { id: 'log-001b', date: daysAgo(30), technician: 'Jane Smith', workPerformed: 'Calibration', partsUsed: [], notes: 'Recalibrated pressure sensors.', status: EquipmentStatus.Operational },
    ],
    riskAssessments: [
      { likelihood: 4, severity: 5, detectability: 2, rpn: 40, riskLevel: RiskLevel.Moderate, actionRequired: 'Review alarm system software.', assessmentDate: daysAgo(5) }
    ],
    maintenanceIntervalDays: 90,
  },
  {
    id: 'eq-002',
    name: 'Defibrillator',
    model: 'CardioShock 500',
    serialNumber: 'SN-B67890',
    department: Department.Emergency,
    location: 'ER, Crash Cart 1',
    purchaseDate: daysAgo(1095),
    installationDate: daysAgo(1090),
    manufacturer: 'LifeLine Solutions',
    status: EquipmentStatus.Operational,
    inventoryCode: 'ER-DEF-01',
    maintenanceHistory: [
      { id: 'log-002a', date: daysAgo(90), technician: 'John Doe', workPerformed: 'Battery Replacement', partsUsed: ['Li-ion Battery Pack'], notes: 'Replaced battery pack and tested charge cycles.', status: EquipmentStatus.Operational },
    ],
    riskAssessments: [
      { likelihood: 2, severity: 5, detectability: 1, rpn: 10, riskLevel: RiskLevel.Negligible, actionRequired: 'Routine monitoring.', assessmentDate: daysAgo(90) }
    ],
    maintenanceIntervalDays: 180,
  },
  {
    id: 'eq-003',
    name: 'X-ray Machine',
    model: 'ImageX 3000',
    serialNumber: 'SN-C11223',
    department: Department.Radiology,
    location: 'Radiology, Room 2',
    purchaseDate: daysAgo(1825),
    installationDate: daysAgo(1820),
    manufacturer: 'RayView Technologies',
    status: EquipmentStatus.OutOfService,
    inventoryCode: 'RAD-XRAY-02',
    maintenanceHistory: [
      { id: 'log-003a', date: daysAgo(2), technician: 'System', workPerformed: 'Tube Failure Detected', partsUsed: [], notes: 'X-ray tube has failed. Requires immediate replacement.', status: EquipmentStatus.OutOfService }
    ],
    riskAssessments: [
      { likelihood: 5, severity: 4, detectability: 1, rpn: 20, riskLevel: RiskLevel.Low, actionRequired: 'Acceptable, but schedule regular preventive maintenance', assessmentDate: daysAgo(365) },
      { likelihood: 5, severity: 5, detectability: 1, rpn: 125, riskLevel: RiskLevel.Severe, actionRequired: 'Immediate replacement of X-ray tube required.', assessmentDate: daysAgo(2) }
    ],
    maintenanceIntervalDays: 365,
  },
  {
    id: 'eq-004',
    name: 'Dental Chair',
    model: 'ComfortDent Pro',
    serialNumber: 'SN-D44556',
    department: Department.Dental,
    location: 'Dental Clinic, Suite 3',
    purchaseDate: daysAgo(365),
    installationDate: daysAgo(360),
    manufacturer: 'SmileMakers Dental',
    status: EquipmentStatus.Operational,
    inventoryCode: 'DNT-CHR-03',
    maintenanceHistory: [
      { id: 'log-004a', date: daysAgo(10), technician: 'Emily White', workPerformed: 'Hydraulic Fluid Check', partsUsed: [], notes: 'Checked and topped off hydraulic fluid. System operating smoothly.', status: EquipmentStatus.Operational }
    ],
    riskAssessments: [
      { likelihood: 1, severity: 2, detectability: 2, rpn: 4, riskLevel: RiskLevel.Negligible, actionRequired: 'Routine monitoring.', assessmentDate: daysAgo(10) }
    ],
    maintenanceIntervalDays: 180,
  },
    {
    id: 'eq-005',
    name: 'Ultrasound Machine',
    model: 'SonoScan HD',
    serialNumber: 'SN-E77889',
    department: Department.ObstetricsGynecology,
    location: 'OBGYN Clinic, Room A',
    purchaseDate: daysAgo(500),
    installationDate: daysAgo(495),
    manufacturer: 'MedTech Inc.',
    status: EquipmentStatus.UnderMaintenance,
    inventoryCode: 'OB-US-01',
    maintenanceHistory: [
      { id: 'log-005a', date: daysAgo(1), technician: 'Jane Smith', workPerformed: 'Transducer Repair', partsUsed: ['Transducer Cable'], notes: 'Replacing faulty transducer cable. Awaiting part delivery.', status: EquipmentStatus.UnderMaintenance }
    ],
    riskAssessments: [
      { likelihood: 3, severity: 3, detectability: 3, rpn: 27, riskLevel: RiskLevel.Low, actionRequired: 'Schedule preventive maintenance.', assessmentDate: daysAgo(30) }
    ],
    maintenanceIntervalDays: 120,
  },
   {
    id: 'eq-006',
    name: 'Patient Monitor',
    model: 'VitalTrack 8',
    serialNumber: 'SN-F99001',
    department: Department.SurgicalWard,
    location: 'Surgical Ward, Bed 12',
    purchaseDate: daysAgo(800),
    installationDate: daysAgo(790),
    manufacturer: 'LifeLine Solutions',
    status: EquipmentStatus.NeedsMaintenance,
    inventoryCode: 'SW-MON-12',
    maintenanceHistory: [],
    riskAssessments: [
      { likelihood: 4, severity: 4, detectability: 2, rpn: 32, riskLevel: RiskLevel.Moderate, actionRequired: 'ECG module showing intermittent failures. Requires inspection.', assessmentDate: daysAgo(7) }
    ],
    maintenanceIntervalDays: 90,
  },
  {
    id: 'eq-007',
    name: 'ECG Machine',
    model: 'CardioGraph 12',
    serialNumber: 'SN-G12121',
    department: Department.MedicalWard,
    location: 'Ward 3, Station A',
    purchaseDate: daysAgo(300),
    installationDate: daysAgo(295),
    manufacturer: 'MedTech Inc.',
    status: EquipmentStatus.Operational,
    inventoryCode: 'MW-ECG-04',
    maintenanceHistory: [
      { id: 'log-007a', date: createUrgentServiceDate(30), technician: 'John Doe', workPerformed: 'Preventive Maintenance', partsUsed: ['Electrodes'], notes: 'Routine check, replaced electrodes.', status: EquipmentStatus.Operational },
    ],
    riskAssessments: [
      { likelihood: 2, severity: 3, detectability: 2, rpn: 12, riskLevel: RiskLevel.Low, actionRequired: 'Schedule regular maintenance.', assessmentDate: daysAgo(30) }
    ],
    maintenanceIntervalDays: 30,
  },
  {
    id: 'eq-008',
    name: 'Microscope',
    model: 'LabScope 5',
    serialNumber: 'SN-H23232',
    department: Department.Laboratory,
    location: 'Lab, Station 3',
    purchaseDate: daysAgo(400),
    installationDate: daysAgo(395),
    manufacturer: 'OptiCore Labs',
    status: EquipmentStatus.Operational,
    inventoryCode: 'LAB-MIC-05',
    maintenanceHistory: [
      { id: 'log-008a', date: daysAgo(100), technician: 'Emily White', workPerformed: 'Cleaned Lenses', partsUsed: [], notes: 'Objective lenses cleaned and calibrated.', status: EquipmentStatus.Operational },
    ],
    riskAssessments: [
      { likelihood: 1, severity: 2, detectability: 1, rpn: 2, riskLevel: RiskLevel.Negligible, actionRequired: 'Routine monitoring.', assessmentDate: daysAgo(100) }
    ],
    maintenanceIntervalDays: 180,
  },
  {
    id: 'eq-009',
    name: 'Infusion Pump',
    model: 'FluidFlow 300',
    serialNumber: 'SN-I34343',
    department: Department.PediatricWard,
    location: 'Peds, Room 201',
    purchaseDate: daysAgo(150),
    installationDate: daysAgo(145),
    manufacturer: 'MedTech Inc.',
    status: EquipmentStatus.NeedsMaintenance,
    inventoryCode: 'PED-INF-02',
    maintenanceHistory: [],
    riskAssessments: [
      { likelihood: 3, severity: 4, detectability: 2, rpn: 24, riskLevel: RiskLevel.Low, actionRequired: 'Flow rate sensor requires calibration.', assessmentDate: daysAgo(3) }
    ],
    maintenanceIntervalDays: 60,
  },
  {
    id: 'eq-010',
    name: 'Anesthesia Machine',
    model: 'SomaSafe 9000',
    serialNumber: 'SN-J45454',
    department: Department.OperationRoom,
    location: 'OR 3',
    purchaseDate: daysAgo(900),
    installationDate: daysAgo(890),
    manufacturer: 'LifeLine Solutions',
    status: EquipmentStatus.Operational,
    inventoryCode: 'OR-ANM-03',
    maintenanceHistory: [
      { id: 'log-010a', date: daysAgo(50), technician: 'John Doe', workPerformed: 'Vaporizer check', partsUsed: ['Sealant Ring'], notes: 'Replaced vaporizer sealant ring and passed leak test.', status: EquipmentStatus.Operational },
    ],
    riskAssessments: [
      { likelihood: 2, severity: 5, detectability: 2, rpn: 20, riskLevel: RiskLevel.Low, actionRequired: 'Routine maintenance schedule on track.', assessmentDate: daysAgo(50) }
    ],
    maintenanceIntervalDays: 120,
  },
  {
    id: 'eq-011',
    name: 'Autoclave',
    model: 'SteriPro 20L',
    serialNumber: 'SN-K56565',
    department: Department.Dental,
    location: 'Sterilization Room',
    purchaseDate: daysAgo(600),
    installationDate: daysAgo(595),
    manufacturer: 'SmileMakers Dental',
    status: EquipmentStatus.UnderMaintenance,
    inventoryCode: 'DNT-ACL-01',
    maintenanceHistory: [
      { id: 'log-011a', date: daysAgo(1), technician: 'Jane Smith', workPerformed: 'Pressure Valve Replacement', partsUsed: ['Pressure Release Valve'], notes: 'Valve failed during cycle. Awaiting new part.', status: EquipmentStatus.UnderMaintenance },
    ],
    riskAssessments: [
      { likelihood: 4, severity: 3, detectability: 1, rpn: 12, riskLevel: RiskLevel.Low, actionRequired: 'Monitor pressure cycles after repair.', assessmentDate: daysAgo(1) }
    ],
    maintenanceIntervalDays: 90,
  },
  {
    id: 'eq-012',
    name: 'Centrifuge',
    model: 'SpinMaster 5000',
    serialNumber: 'SN-L67676',
    department: Department.Laboratory,
    location: 'Lab, Bench 2',
    purchaseDate: daysAgo(1200),
    installationDate: daysAgo(1195),
    manufacturer: 'OptiCore Labs',
    status: EquipmentStatus.Operational,
    inventoryCode: 'LAB-CEN-02',
    maintenanceHistory: [
      { id: 'log-012a', date: daysAgo(200), technician: 'Emily White', workPerformed: 'Motor brush replacement', partsUsed: ['Carbon Brushes'], notes: 'Routine replacement of motor brushes.', status: EquipmentStatus.Operational },
    ],
    riskAssessments: [
      { likelihood: 2, severity: 2, detectability: 2, rpn: 8, riskLevel: RiskLevel.Negligible, actionRequired: 'Routine monitoring.', assessmentDate: daysAgo(200) }
    ],
    maintenanceIntervalDays: 365,
  },
  {
    id: 'eq-013',
    name: 'Blood Pressure Monitor',
    model: 'CuffCheck Basic',
    serialNumber: 'SN-M78787',
    department: Department.OPD,
    location: 'OPD, Room 5',
    purchaseDate: daysAgo(180),
    installationDate: daysAgo(180),
    manufacturer: 'MedTech Inc.',
    status: EquipmentStatus.Operational,
    inventoryCode: 'OPD-BPM-05',
    maintenanceHistory: [],
    riskAssessments: [
      { likelihood: 1, severity: 2, detectability: 1, rpn: 2, riskLevel: RiskLevel.Negligible, actionRequired: 'Annual calibration check.', assessmentDate: daysAgo(180) }
    ],
    maintenanceIntervalDays: 365,
  },
  {
    id: 'eq-014',
    name: 'Surgical Light',
    model: 'LumaField Pro',
    serialNumber: 'SN-N89898',
    department: Department.SurgicalWard,
    location: 'OR 2',
    purchaseDate: daysAgo(2000),
    installationDate: daysAgo(1990),
    manufacturer: 'RayView Technologies',
    status: EquipmentStatus.Operational,
    inventoryCode: 'SW-LGT-02',
    maintenanceHistory: [
      { id: 'log-014a', date: daysAgo(400), technician: 'John Doe', workPerformed: 'Bulb Replacement', partsUsed: ['LED Bulb Array'], notes: 'Replaced primary bulb array.', status: EquipmentStatus.Operational },
    ],
    riskAssessments: [
      { likelihood: 2, severity: 3, detectability: 1, rpn: 6, riskLevel: RiskLevel.Negligible, actionRequired: 'Routine monitoring.', assessmentDate: daysAgo(400) }
    ],
    maintenanceIntervalDays: 730,
  },
  {
    id: 'eq-015',
    name: 'Hemodialysis Machine',
    model: 'PuraFlow 100',
    serialNumber: 'SN-O90909',
    department: Department.DialysisUnit,
    location: 'Dialysis, Station 6',
    purchaseDate: daysAgo(600),
    installationDate: daysAgo(590),
    manufacturer: 'LifeLine Solutions',
    status: EquipmentStatus.NeedsMaintenance,
    inventoryCode: 'DIA-HDM-06',
    maintenanceHistory: [
       { id: 'log-015a', date: daysAgo(170), technician: 'Jane Smith', workPerformed: 'Filter change', partsUsed: ['Dialyzer Filter'], notes: 'Routine filter change performed.', status: EquipmentStatus.Operational },
    ],
    riskAssessments: [
      { likelihood: 4, severity: 5, detectability: 3, rpn: 60, riskLevel: RiskLevel.High, actionRequired: 'Blood leak detector is reporting false positives. Immediate inspection required.', assessmentDate: daysAgo(4) }
    ],
    maintenanceIntervalDays: 180,
  },
  {
    id: 'eq-016',
    name: 'Fetal Monitor',
    model: 'BabyBeat 2',
    serialNumber: 'SN-P13579',
    department: Department.MaternityWard,
    location: 'L&D, Room 3',
    purchaseDate: daysAgo(250),
    installationDate: daysAgo(245),
    manufacturer: 'MedTech Inc.',
    status: EquipmentStatus.Operational,
    inventoryCode: 'MAT-FET-03',
    maintenanceHistory: [],
    riskAssessments: [
      { likelihood: 2, severity: 4, detectability: 2, rpn: 16, riskLevel: RiskLevel.Low, actionRequired: 'Schedule regular maintenance.', assessmentDate: daysAgo(245) }
    ],
    maintenanceIntervalDays: 90,
  },
  {
    id: 'eq-017',
    name: 'Incubator',
    model: 'NurturePod 1',
    serialNumber: 'SN-Q24680',
    department: Department.NICU,
    location: 'NICU, Bay 1',
    purchaseDate: daysAgo(1000),
    installationDate: daysAgo(990),
    manufacturer: 'LifeLine Solutions',
    status: EquipmentStatus.Operational,
    inventoryCode: 'NICU-INC-01',
    maintenanceHistory: [
       { id: 'log-017a', date: daysAgo(30), technician: 'John Doe', workPerformed: 'Temperature sensor calibration', partsUsed: [], notes: 'Calibrated primary and secondary temperature sensors.', status: EquipmentStatus.Operational },
    ],
    riskAssessments: [
      { likelihood: 2, severity: 5, detectability: 1, rpn: 10, riskLevel: RiskLevel.Negligible, actionRequired: 'Routine monitoring.', assessmentDate: daysAgo(30) }
    ],
    maintenanceIntervalDays: 180,
  },
  {
    id: 'eq-018',
    name: 'Treadmill',
    model: 'CardioRun 5K',
    serialNumber: 'SN-R11224',
    department: Department.Physiotherapy,
    location: 'Rehab Gym',
    purchaseDate: daysAgo(800),
    installationDate: daysAgo(790),
    manufacturer: 'FitWell Inc.',
    status: EquipmentStatus.OutOfService,
    inventoryCode: 'PHY-TRD-01',
    maintenanceHistory: [
       { id: 'log-018a', date: daysAgo(10), technician: 'System', workPerformed: 'Motor Overload', partsUsed: [], notes: 'Drive motor failed. Unit is out of service until motor is replaced.', status: EquipmentStatus.OutOfService },
    ],
    riskAssessments: [
      { likelihood: 3, severity: 2, detectability: 1, rpn: 6, riskLevel: RiskLevel.Negligible, actionRequired: 'Routine monitoring.', assessmentDate: daysAgo(365) }
    ],
    maintenanceIntervalDays: 365,
  },
  {
    id: 'eq-019',
    name: 'MRI Machine',
    model: 'Magneton Spectra',
    serialNumber: 'SN-S33445',
    department: Department.Radiology,
    location: 'Radiology, MRI Suite',
    purchaseDate: daysAgo(2500),
    installationDate: daysAgo(2450),
    manufacturer: 'RayView Technologies',
    status: EquipmentStatus.UnderMaintenance,
    inventoryCode: 'RAD-MRI-01',
    maintenanceHistory: [
       { id: 'log-019a', date: daysAgo(3), technician: 'Jane Smith', workPerformed: 'Cooling System Flush', partsUsed: ['Helium (Top-up)'], notes: 'Performing scheduled cryogen top-up and cooling system flush. System unavailable for 48 hours.', status: EquipmentStatus.UnderMaintenance },
    ],
    riskAssessments: [
      { likelihood: 2, severity: 5, detectability: 4, rpn: 40, riskLevel: RiskLevel.Moderate, actionRequired: 'Monitor helium levels closely post-service.', assessmentDate: daysAgo(3) }
    ],
    maintenanceIntervalDays: 730,
  }
];