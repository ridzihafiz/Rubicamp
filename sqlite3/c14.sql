/*JURUSAN*/
CREATE TABLE jurusan(
    id_jurusan TEXT PRIMARY KEY NOT NULL,
    nama_jurusan TEXT NOT NULL
);

INSERT INTO jurusan(id_jurusan, nama_jurusan) 
VALUES 
    ('TI01', 'Teknik Informatika'), 
    ('AK01', 'Akuntansi'),
    ('DK01', 'Kedokteran');



/*MAHASISWA*/
CREATE TABLE mahasiswa(
    nim TEXT PRIMARY KEY NOT NULL,
    nama_mhs VARCHAR(50) NOT NULL,
    alamat VARCHAR(255),
    id_jurusan TEXT NOT NULL,
    FOREIGN KEY (id_jurusan) REFERENCES jurusan(id_jurusan)
);

INSERT INTO mahasiswa(nim, nama_mhs, alamat, id_jurusan)
VALUES
    ('001', 'Garis', 'Taman Galaxy', 'TI01'),
    ('002', 'Ridzi', 'Villa Nusa Indah', 'AK01'),
    ('003', 'Hafiz', 'Kota Wisata', 'DK01');



/*DOSEN*/
CREATE TABLE dosen(
    nip TEXT PRIMARY KEY NOT NULL,
    nama_dosen VARCHAR(50)
);

INSERT INTO dosen(nip, nama_dosen)
VALUES
    ('D01', 'Balthier'),
    ('D02', 'Vaan'),
    ('D03', 'Lunafreya');



/*MATA KULIAH*/
CREATE TABLE matakuliah(
    id_matkul TEXT PRIMARY KEY NOT NULL,
    nama_matkul VARCHAR(60) NOT NULL,
    sks INT NOT NULL
);

INSERT INTO matakuliah(id_matkul, nama_matkul, sks)
VALUES
    ('MTI01', 'Programming', 3),
    ('MAK01', 'Audit', 3),
    ('MDK01', 'Pengobatan Anak', 4);



/*KRS (Kartu Rencana Studi)*/
CREATE TABLE krs(
    id_krs TEXT PRIMARY KEY NOT NULL,
    nilai VARCHAR(1) NOT NULL,
    nim TEXT NOT NULL,
    nip TEXT NOT NULL,
    id_jurusan TEXT NOT NULL,
    id_matkul TEXT NOT NULL,
    FOREIGN KEY (nim) REFERENCES mahasiswa(nim),
    FOREIGN KEY (nip) REFERENCES dosen(nip),
    FOREIGN KEY (id_jurusan) REFERENCES jurusan(id_jurusan),
    FOREIGN KEY (id_matkul) REFERENCES matakuliah(id_matkul)
);

INSERT INTO krs(id_krs, nilai, nim, nip, id_jurusan, id_matkul)
VALUES
    ('N001', 'A', '001', 'D01', 'TI01', 'MTI01'),
    ('N002', 'C', '002', 'D02', 'AK01', 'MAK01'),
    ('N003', 'B', '003', 'D03', 'DK01', 'MDK01');
