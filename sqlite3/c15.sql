/* Nomor 1 */
SELECT 
    nim, nama_mhs, jurusan.nama_jurusan 
FROM mahasiswa INNER JOIN jurusan ON mahasiswa.id_jurusan = jurusan.id_jurusan;



/* Nomor 2 */
ALTER TABLE mahasiswa ADD COLUMN umur INT;

UPDATE mahasiswa
SET umur = 19 WHERE nim = '002';

UPDATE mahasiswa
SET umur = 22 WHERE nim = '001';

UPDATE mahasiswa
SET umur = 24 WHERE nim = '003';

select * from mahasiswa where umur < 20;



/* Nomor 3 */
SELECT mahasiswa.nim, mahasiswa.nama_mhs, matakuliah.nama_matkul, krs.nilai FROM mahasiswa
INNER JOIN krs ON mahasiswa.nim = krs.nim
INNER JOIN matakuliah on matakuliah.id_matkul = krs.id_matkul
WHERE nilai BETWEEN 'A' AND 'B';



/* Nomor 4 */
SELECT SUM(sks) FROM matakuliah
GROUP BY

SELECT mahasiswa.nim, mahasiswa.nama_mhs, SUM(matakuliah.sks) AS Total_SKS
FROM mahasiswa
INNER JOIN krs ON mahasiswa.nim = krs.nim
INNER JOIN matakuliah on matakuliah.id_matkul = krs.id_matkul
GROUP BY mahasiswa.nim
HAVING Total_SKS >= 10;



/*Nomor 5*/
INSERT INTO matakuliah(id_matkul, nama_matkul, sks)
VALUES
    ('MTI02', 'Data Mining', 4);

INSERT INTO dosen(nip, nama_dosen)
VALUES
    ('D04', 'Nyx Ulric');

INSERT INTO krs(id_krs, nilai, nim, nip, id_jurusan, id_matkul)
VALUES
    ('N004', 'D', '001', 'D04', 'TI01', 'MTI02');

-----------------------------------------------------------------

INSERT INTO matakuliah(id_matkul, nama_matkul, sks)
VALUES
    ('MTI03', 'React Native', 4);

INSERT INTO dosen(nip, nama_dosen)
VALUES
    ('D05', 'Tifa Lockhart');

INSERT INTO krs(id_krs, nilai, nim, nip, id_jurusan, id_matkul)
VALUES
    ('N005', 'C', '001', 'D05', 'TI01', 'MTI03');


SELECT mahasiswa.nim, mahasiswa.nama_mhs, matakuliah.nama_matkul
FROM mahasiswa
INNER JOIN krs ON mahasiswa.nim = krs.nim
INNER JOIN matakuliah on matakuliah.id_matkul = krs.id_matkul
WHERE matakuliah.nama_matkul LIKE '%Data Mining%';



/* Nomor 6 */
SELECT mahasiswa.nim, mahasiswa.nama_mhs, dosen.nama_dosen
FROM mahasiswa
INNER JOIN krs ON mahasiswa.nim = krs.nim
INNER JOIN dosen ON dosen.nip = krs.nip;



/*Nomor 7*/

SELECT * FROM mahasiswa
ORDER BY umur;
--DESC;



/*Nomor 8*/
SELECT mahasiswa.nim, mahasiswa.nama_mhs, jurusan.nama_jurusan, matakuliah.nama_matkul, krs.nilai,
CASE 
    WHEN nilai = 'A' THEN 'Sangat Bagus'
    WHEN nilai = 'B' THEN 'Bagus'
    WHEN nilai = 'C' THEN 'Cukup Bagus'
    WHEN nilai = 'D' THEN 'Mengulang'
    END AS Ket
FROM mahasiswa
INNER JOIN krs ON mahasiswa.nim = krs.nim
INNER JOIN dosen ON krs.nip = dosen.nip
INNER JOIN jurusan ON krs.id_jurusan = jurusan.id_jurusan
INNER JOIN matakuliah ON krs.id_matkul = matakuliah.id_matkul
WHERE nilai = 'D';