import { Option } from "../components/RadioButtonGroup";
import { Colors } from "./Colors";

/**
 * Strings Text
 */
export const Strings = {
    NO_DATA_AVAILABLE: "No data available.",
    ERROR_MESSAGE: "Something want wrong!",
    RETRY: "Retry",
    COPIED: "Berhasil Salin ID Transaksi",
    ID_TRANSAKSI_LABEL: "ID TRANSAKSI:#",
    DETAIL_TRANSAKSI_LABEL: "DETAIL TRANSAKSI",
    NOMINAL_LABEL: "NOMINAL",
    BERITA_TRANSFER_LABEL: "BERITA TRANSFER",
    KODE_UNIK_LABEL: "KODE UNIK",
    WAKTU_DIBUAT_LABEL: "WAKTU DIBUAT",
    TRANSACTION_SEARCH_PLACEHOLDER: "Cari nama, bank, atau nominal"
}

/**
 * Status Color
 */
export const StatusColor = {
    SUCCESS: Colors.green,
    PENDING: Colors.softRed
}

/**
 * Status Transaction Text
 */
export const StatusChip = {
    SUCCESS: "Berhasil",
    PENDING: "Pengecekan"
}

/**
 * Filter Options Data
 */
export const FilterOptions: Option[] = [
    {
        value: 'urutkan',
        label: 'Urutkan'
    },
    {
        value: 'nama_az',
        label: 'Nama A-Z'
    },
    {
        value: 'nama_za',
        label: 'Nama Z-A'
    },
    {
        value: 'tanggal_terbaru',
        label: 'Tanggal Terbaru'
    },
    {
        value: 'tanggal_terlama',
        label: 'Tanggal Terlama'
    },
]
