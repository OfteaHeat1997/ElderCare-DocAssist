# Data Dictionary - ZIB Mapping

This document maps ElderCare-DocAssist fields to ZIB (Zorginformatiebouwstenen) elements for Dutch healthcare interoperability.

## SOAP Note Fields

| App Field | SOAP Section | ZIB Element (short)          | Type   | Unit / Values | Example                              |
|-----------|--------------|------------------------------|--------|---------------|--------------------------------------|
| `S_text`  | S            | CarePlan/Observation.note    | string | free text     | "Resident says wound is sore."       |
| `O_text`  | O            | Observation.comment          | string | free text     | "Redness 2cm around edge."           |
| `A_text`  | A            | Problem/Condition.assessment | string | free text     | "Likely mild infection."             |
| `P_text`  | P            | CarePlan.activity            | string | free text     | "Clean, apply ointment, recheck 4h." |

## Vital Signs Fields

| App Field        | SOAP Section | ZIB Element (short)        | Type    | Unit      | Example |
|------------------|--------------|----------------------------|---------|-----------|---------|
| `systolic_mmHg`  | O            | **BloodPressure.systolic** | integer | **mmHg**  | 132     |
| `diastolic_mmHg` | O            | **BloodPressure.diastolic**| integer | **mmHg**  | 84      |
| `temperature_c`  | O            | **BodyTemperature**        | decimal | **°C**    | 37.8    |
| `heart_rate_bpm` | O            | **HeartRate**              | integer | **bpm**   | 86      |

## Metadata Fields

| App Field      | Description                          | Type      | Values                        |
|----------------|--------------------------------------|-----------|-------------------------------|
| `id`           | Unique identifier                    | integer   | auto-increment                |
| `created_at`   | Note creation timestamp              | timestamp | ISO 8601                      |
| `updated_at`   | Last modification timestamp          | timestamp | ISO 8601                      |
| `audio_path`   | Local path to audio recording        | string    | file path                     |
| `transcript`   | Whisper transcription output         | string    | free text                     |
| `review_state` | Approval workflow state              | string    | draft, reviewed, approved     |

## ZIB References

- **BloodPressure**: Maps to ZIB BloodPressure (nl.zorg.BloodPressure)
- **BodyTemperature**: Maps to ZIB BodyTemperature (nl.zorg.BodyTemperature)
- **HeartRate**: Maps to ZIB HeartRate (nl.zorg.HeartRate)
- **CarePlan**: Maps to ZIB CarePlan (nl.zorg.CarePlan)
- **Observation**: Maps to ZIB GeneralMeasurement (nl.zorg.GeneralMeasurement)

## Units Standard

All units follow SI/UCUM standards as required by ZIB:
- Blood pressure: mmHg (millimeters of mercury)
- Temperature: °C (degrees Celsius)
- Heart rate: bpm (beats per minute)

## Export Format

When exporting to FHIR/BGZ:
- SOAP text fields map to Observation.note or CarePlan.activity
- Vitals map to respective Observation resources with proper LOINC codes
- All timestamps in UTC ISO 8601 format
