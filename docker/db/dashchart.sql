--
-- PostgreSQL database dump
--

-- Dumped from database version 12.3 (Debian 12.3-1.pgdg100+1)
-- Dumped by pg_dump version 12.3

-- Started on 2020-07-22 23:40:00 CEST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2955 (class 1262 OID 16384)
-- Name: dashchart; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE dashchart WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.utf8' LC_CTYPE = 'en_US.utf8';


ALTER DATABASE dashchart OWNER TO postgres;

\connect dashchart

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 202 (class 1259 OID 16385)
-- Name: Chart; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Chart" (
    columns jsonb NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    id integer NOT NULL,
    name text NOT NULL,
    "projectId" integer NOT NULL,
    props jsonb NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Chart" OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 16392)
-- Name: Chart_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Chart_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Chart_id_seq" OWNER TO postgres;

--
-- TOC entry 2956 (class 0 OID 0)
-- Dependencies: 203
-- Name: Chart_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Chart_id_seq" OWNED BY public."Chart".id;


--
-- TOC entry 204 (class 1259 OID 16394)
-- Name: DataFrame; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."DataFrame" (
    columns jsonb NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    id integer NOT NULL,
    name text NOT NULL,
    "projectId" integer NOT NULL,
    source text NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."DataFrame" OWNER TO postgres;

--
-- TOC entry 205 (class 1259 OID 16401)
-- Name: DataFrame_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."DataFrame_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."DataFrame_id_seq" OWNER TO postgres;

--
-- TOC entry 2957 (class 0 OID 0)
-- Dependencies: 205
-- Name: DataFrame_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."DataFrame_id_seq" OWNED BY public."DataFrame".id;


--
-- TOC entry 206 (class 1259 OID 16403)
-- Name: Project; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Project" (
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    id integer NOT NULL,
    name text NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Project" OWNER TO postgres;

--
-- TOC entry 207 (class 1259 OID 16410)
-- Name: Project_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Project_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Project_id_seq" OWNER TO postgres;

--
-- TOC entry 2958 (class 0 OID 0)
-- Dependencies: 207
-- Name: Project_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Project_id_seq" OWNED BY public."Project".id;


--
-- TOC entry 208 (class 1259 OID 16412)
-- Name: _Migration; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."_Migration" (
    revision integer NOT NULL,
    name text NOT NULL,
    datamodel text NOT NULL,
    status text NOT NULL,
    applied integer NOT NULL,
    rolled_back integer NOT NULL,
    datamodel_steps text NOT NULL,
    database_migration text NOT NULL,
    errors text NOT NULL,
    started_at timestamp(3) without time zone NOT NULL,
    finished_at timestamp(3) without time zone
);


ALTER TABLE public."_Migration" OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 16418)
-- Name: _Migration_revision_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."_Migration_revision_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."_Migration_revision_seq" OWNER TO postgres;

--
-- TOC entry 2959 (class 0 OID 0)
-- Dependencies: 209
-- Name: _Migration_revision_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."_Migration_revision_seq" OWNED BY public."_Migration".revision;


--
-- TOC entry 2800 (class 2604 OID 16420)
-- Name: Chart id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Chart" ALTER COLUMN id SET DEFAULT nextval('public."Chart_id_seq"'::regclass);


--
-- TOC entry 2802 (class 2604 OID 16421)
-- Name: DataFrame id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DataFrame" ALTER COLUMN id SET DEFAULT nextval('public."DataFrame_id_seq"'::regclass);


--
-- TOC entry 2804 (class 2604 OID 16422)
-- Name: Project id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Project" ALTER COLUMN id SET DEFAULT nextval('public."Project_id_seq"'::regclass);


--
-- TOC entry 2805 (class 2604 OID 16423)
-- Name: _Migration revision; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_Migration" ALTER COLUMN revision SET DEFAULT nextval('public."_Migration_revision_seq"'::regclass);


--
-- TOC entry 2942 (class 0 OID 16385)
-- Dependencies: 202
-- Data for Name: Chart; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Chart" (columns, "createdAt", id, name, "projectId", props, "updatedAt") VALUES ('{"LEFT": {"columnName": "cosine_y", "dataFrameId": 1, "dataFrameName": "Sincos"}, "RIGHT": {"columnName": "sine_y", "dataFrameId": 1, "dataFrameName": "Sincos"}, "BOTTOM": {"columnName": "x", "dataFrameId": 1, "dataFrameName": "Sincos"}}', '2020-07-21 19:59:11.977', 1, 'Sine & Cosine', 1, '[{"data": {"x": {"scale": "LINEAR", "style": {"fontSize": 16, "tickSize": 6, "barPadding": 0.5, "fontFamily": "SIGNIKA_LIGHT", "tickPadding": 3}}, "y": {"scale": "LINEAR", "style": {"fontSize": 16, "tickSize": 6, "barPadding": 0.5, "fontFamily": "SIGNIKA_LIGHT", "tickPadding": 3}}}, "type": "SCATTER", "dimensions": {"width": 800, "height": 600, "margin": {"top": 40, "left": 40, "right": 80, "bottom": 80}}, "colourScheme": "Spectral"}, {"data": {"x": {"scale": "LINEAR", "style": {"fontSize": 16, "tickSize": 6, "barPadding": 0.5, "fontFamily": "SIGNIKA_LIGHT", "tickPadding": 3}}, "y": {"scale": "LINEAR", "style": {"fontSize": 16, "tickSize": 6, "barPadding": 0.5, "fontFamily": "SIGNIKA_LIGHT", "tickPadding": 3}}}, "type": "LINE", "dimensions": {"width": 800, "height": 600, "margin": {"top": 40, "left": 40, "right": 80, "bottom": 80}}, "colourScheme": "Spectral"}]', '2020-07-22 17:41:31.037');
INSERT INTO public."Chart" (columns, "createdAt", id, name, "projectId", props, "updatedAt") VALUES ('{"LEFT": {"columnName": "y1", "dataFrameId": 2, "dataFrameName": "Tunable Sigmoid"}, "RIGHT": {"columnName": "y2", "dataFrameId": 2, "dataFrameName": "Tunable Sigmoid"}, "BOTTOM": {"columnName": "x", "dataFrameId": 2, "dataFrameName": "Tunable Sigmoid"}}', '2020-07-22 18:21:58.227', 2, 'Tunable Sigmoid', 1, '[{"data": {"x": {"scale": "LINEAR", "style": {"fontSize": 16, "tickSize": 6, "barPadding": 0.5, "fontFamily": "SIGNIKA_LIGHT", "tickPadding": 3, "colourScheme": "Ocean"}}, "y": {"scale": "LINEAR", "style": {"fontSize": 16, "tickSize": 6, "barPadding": 0.5, "fontFamily": "SIGNIKA_LIGHT", "tickPadding": 3, "colourScheme": "Ocean"}}}, "type": "LINE", "dimensions": {"width": 800, "height": 600, "margin": {"top": 40, "left": 40, "right": 80, "bottom": 80}}, "colourScheme": "Ocean"}, {"data": {"x": {"scale": "LINEAR", "style": {"fontSize": 16, "tickSize": 6, "barPadding": 0.5, "fontFamily": "SIGNIKA_LIGHT", "tickPadding": 3, "colourScheme": "Ocean"}}, "y": {"scale": "LINEAR", "style": {"fontSize": 16, "tickSize": 6, "barPadding": 0.5, "fontFamily": "SIGNIKA_LIGHT", "tickPadding": 3, "colourScheme": "Ocean"}}}, "type": "LINE", "dimensions": {"width": 800, "height": 600, "margin": {"top": 40, "left": 40, "right": 80, "bottom": 80}}, "colourScheme": "Ocean"}]', '2020-07-22 18:21:58.227');
INSERT INTO public."Chart" (columns, "createdAt", id, name, "projectId", props, "updatedAt") VALUES ('{"LEFT": {"columnName": "sales", "dataFrameId": 3, "dataFrameName": "Sales"}, "BOTTOM": {"columnName": "last_name", "dataFrameId": 3, "dataFrameName": "Sales"}}', '2020-07-22 18:41:21.923', 3, 'Sales', 1, '[{"data": {"x": {"scale": "LINEAR", "style": {"fontSize": 16, "tickSize": 6, "barPadding": 0.5, "fontFamily": "SIGNIKA_LIGHT", "tickPadding": 3, "colourScheme": "Spectral"}}, "y": {"scale": "LINEAR", "style": {"fontSize": 16, "tickSize": 6, "barPadding": 0.5, "fontFamily": "SIGNIKA_LIGHT", "tickPadding": 3, "colourScheme": "Spectral"}}}, "type": "BAR_VERTICAL", "dimensions": {"width": 800, "height": 600, "margin": {"top": 40, "left": 40, "right": 80, "bottom": 80}}, "colourScheme": "Spectral"}]', '2020-07-22 18:41:21.923');
INSERT INTO public."Chart" (columns, "createdAt", id, name, "projectId", props, "updatedAt") VALUES ('{"LEFT": {"columnName": "age", "dataFrameId": 3, "dataFrameName": "Sales"}, "RIGHT": {"columnName": "sales", "dataFrameId": 3, "dataFrameName": "Sales"}, "BOTTOM": {"columnName": "last_name", "dataFrameId": 3, "dataFrameName": "Sales"}}', '2020-07-22 19:28:29.254', 4, 'Age vs Sales', 1, '[{"data": {"x": {"scale": "LINEAR", "style": {"fontSize": 16, "tickSize": 6, "barPadding": 0.5, "fontFamily": "SIGNIKA_LIGHT", "tickPadding": 3}}, "y": {"scale": "LINEAR", "style": {"fontSize": 16, "tickSize": 6, "barPadding": 0.5, "fontFamily": "SIGNIKA_LIGHT", "tickPadding": 3}}}, "type": "LINE", "dimensions": {"width": 800, "height": 600, "margin": {"top": 40, "left": 40, "right": 80, "bottom": 80}}, "colourScheme": "Ocean"}, {"data": {"x": {"scale": "LINEAR", "style": {"fontSize": 16, "tickSize": 6, "barPadding": 0.5, "fontFamily": "SIGNIKA_LIGHT", "tickPadding": 3}}, "y": {"scale": "LINEAR", "style": {"fontSize": 16, "tickSize": 6, "barPadding": 0.5, "fontFamily": "SIGNIKA_LIGHT", "tickPadding": 3}}}, "type": "LINE", "dimensions": {"width": 800, "height": 600, "margin": {"top": 40, "left": 40, "right": 80, "bottom": 80}}, "colourScheme": "Ocean"}]', '2020-07-22 19:28:29.255');
INSERT INTO public."Chart" (columns, "createdAt", id, name, "projectId", props, "updatedAt") VALUES ('{"LEFT": {"columnName": "y_overdamped", "dataFrameId": 4, "dataFrameName": "Spring Motion"}, "RIGHT": {"columnName": "y_underdamped", "dataFrameId": 4, "dataFrameName": "Spring Motion"}, "BOTTOM": {"columnName": "x", "dataFrameId": 4, "dataFrameName": "Spring Motion"}}', '2020-07-22 19:56:32.626', 5, 'Over- vs Underdamped', 1, '[{"data": {"x": {"scale": "LINEAR", "style": {"fontSize": 16, "tickSize": 6, "barPadding": 0.5, "fontFamily": "SIGNIKA_LIGHT", "tickPadding": 3}}, "y": {"scale": "LINEAR", "style": {"fontSize": 16, "tickSize": 6, "barPadding": 0.5, "fontFamily": "SIGNIKA_LIGHT", "tickPadding": 3}}}, "type": "SCATTER", "dimensions": {"width": 800, "height": 600, "margin": {"top": 40, "left": 40, "right": 80, "bottom": 80}}, "colourScheme": "Spectral"}, {"data": {"x": {"scale": "LINEAR", "style": {"fontSize": 16, "tickSize": 6, "barPadding": 0.5, "fontFamily": "SIGNIKA_LIGHT", "tickPadding": 3}}, "y": {"scale": "LINEAR", "style": {"fontSize": 16, "tickSize": 6, "barPadding": 0.5, "fontFamily": "SIGNIKA_LIGHT", "tickPadding": 3}}}, "type": "SCATTER", "dimensions": {"width": 800, "height": 600, "margin": {"top": 40, "left": 40, "right": 80, "bottom": 80}}, "colourScheme": "Spectral"}]', '2020-07-22 19:56:32.626');
INSERT INTO public."Chart" (columns, "createdAt", id, name, "projectId", props, "updatedAt") VALUES ('{"TOP": {"columnName": "sine_y", "dataFrameId": 1, "dataFrameName": "Sincos"}, "LEFT": {"columnName": "x", "dataFrameId": 1, "dataFrameName": "Sincos"}, "BOTTOM": {"columnName": "cosine_y", "dataFrameId": 1, "dataFrameName": "Sincos"}}', '2020-07-22 21:29:49.769', 6, 'Serpent', 1, '[{"data": {"x": {"scale": "LINEAR", "style": {"fontSize": 16, "tickSize": 6, "barPadding": 0.5, "fontFamily": "SIGNIKA_LIGHT", "tickPadding": 3, "colourScheme": "Spectral"}}, "y": {"scale": "LINEAR", "style": {"fontSize": 16, "tickSize": 6, "barPadding": 0.5, "fontFamily": "SIGNIKA_LIGHT", "tickPadding": 3, "colourScheme": "Spectral"}}}, "type": "SCATTER", "dimensions": {"width": 800, "height": 600, "margin": {"top": 40, "left": 40, "right": 80, "bottom": 80}}, "colourScheme": "Spectral"}, {"data": {"x": {"scale": "LINEAR", "style": {"fontSize": 16, "tickSize": 6, "barPadding": 0.5, "fontFamily": "SIGNIKA_LIGHT", "tickPadding": 3, "colourScheme": "Spectral"}}, "y": {"scale": "LINEAR", "style": {"fontSize": 16, "tickSize": 6, "barPadding": 0.5, "fontFamily": "SIGNIKA_LIGHT", "tickPadding": 3, "colourScheme": "Spectral"}}}, "type": "SCATTER", "dimensions": {"width": 800, "height": 600, "margin": {"top": 40, "left": 40, "right": 80, "bottom": 80}}, "colourScheme": "Spectral"}]', '2020-07-22 21:29:49.769');


--
-- TOC entry 2944 (class 0 OID 16394)
-- Dependencies: 204
-- Data for Name: DataFrame; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."DataFrame" (columns, "createdAt", id, name, "projectId", source, "updatedAt") VALUES ('{"x": {"type": "NUMBER", "values": [0, 0.02, 0.04, 0.06, 0.08, 0.1, 0.12, 0.14, 0.16, 0.18, 0.2, 0.22, 0.24, 0.26, 0.28, 0.3, 0.32, 0.34, 0.36, 0.38, 0.4, 0.42, 0.44, 0.46, 0.48, 0.5, 0.52, 0.54, 0.56, 0.58, 0.6, 0.62, 0.64, 0.66, 0.68, 0.7, 0.72, 0.74, 0.76, 0.78, 0.8, 0.82, 0.84, 0.86, 0.88, 0.9, 0.92, 0.94, 0.96, 0.98, 1], "inferredType": "NUMBER"}, "sine_y": {"type": "NUMBER", "values": [0, 0.125333233564304, 0.248689887164855, 0.368124552684678, 0.481753674101715, 0.587785252292473, 0.684547105928689, 0.770513242775789, 0.844327925502015, 0.90482705246602, 0.951056516295153, 0.982287250728689, 0.998026728428271, 0.998026728428271, 0.982287250728689, 0.951056516295154, 0.90482705246602, 0.844327925502015, 0.770513242775789, 0.684547105928689, 0.587785252292473, 0.481753674101716, 0.368124552684678, 0.248689887164855, 0.125333233564305, 0.000000000000000122464679914735, -0.125333233564304, -0.248689887164855, -0.368124552684678, -0.481753674101715, -0.587785252292473, -0.684547105928689, -0.770513242775789, -0.844327925502015, -0.90482705246602, -0.951056516295153, -0.982287250728689, -0.998026728428271, -0.998026728428271, -0.982287250728689, -0.951056516295154, -0.90482705246602, -0.844327925502016, -0.77051324277579, -0.684547105928689, -0.587785252292473, -0.481753674101715, -0.368124552684678, -0.248689887164855, -0.125333233564305, -0.000000000000000244929359829471], "inferredType": "NUMBER"}, "cosine_y": {"type": "NUMBER", "values": [1, 0.992114701314478, 0.968583161128631, 0.929776485888251, 0.876306680043864, 0.809016994374947, 0.728968627421412, 0.63742398974869, 0.535826794978997, 0.425779291565073, 0.309016994374947, 0.187381314585725, 0.062790519529314, -0.062790519529313, -0.187381314585725, -0.309016994374947, -0.425779291565073, -0.535826794978997, -0.63742398974869, -0.728968627421411, -0.809016994374947, -0.876306680043863, -0.929776485888251, -0.968583161128631, -0.992114701314478, -1, -0.992114701314478, -0.968583161128631, -0.929776485888251, -0.876306680043864, -0.809016994374947, -0.728968627421412, -0.63742398974869, -0.535826794978996, -0.425779291565072, -0.309016994374948, -0.187381314585725, -0.062790519529313, 0.062790519529313, 0.187381314585724, 0.309016994374947, 0.425779291565073, 0.535826794978996, 0.637423989748689, 0.728968627421411, 0.809016994374947, 0.876306680043864, 0.929776485888251, 0.968583161128631, 0.992114701314478, 1], "inferredType": "NUMBER"}}', '2020-07-21 19:57:09.422', 1, 'Sincos', 1, 'https://gist.githubusercontent.com/frysztak/b4e5c23b080831133078fbf21ff0807a/raw/8fee31dff8e09f67162671114fbe3ddf43e88c9d/sincos.csv', '2020-07-22 17:40:53.369');
INSERT INTO public."DataFrame" (columns, "createdAt", id, name, "projectId", source, "updatedAt") VALUES ('{"x": {"type": "NUMBER", "values": [-1, -0.98, -0.96, -0.94, -0.92, -0.9, -0.88, -0.86, -0.84, -0.82, -0.8, -0.78, -0.76, -0.74, -0.72, -0.7, -0.68, -0.66, -0.64, -0.62, -0.6, -0.58, -0.56, -0.54, -0.52, -0.5, -0.48, -0.46, -0.44, -0.42, -0.4, -0.38, -0.36, -0.34, -0.32, -0.3, -0.28, -0.26, -0.24, -0.22, -0.2, -0.18, -0.16, -0.14, -0.12, -0.1, -0.08, -0.06, -0.04, -0.02, 0, 0.02, 0.04, 0.0600000000000001, 0.0800000000000001, 0.1, 0.12, 0.14, 0.16, 0.18, 0.2, 0.22, 0.24, 0.26, 0.28, 0.3, 0.32, 0.34, 0.36, 0.38, 0.4, 0.42, 0.44, 0.46, 0.48, 0.5, 0.52, 0.54, 0.56, 0.58, 0.6, 0.62, 0.64, 0.66, 0.68, 0.7, 0.72, 0.74, 0.76, 0.78, 0.8, 0.82, 0.84, 0.86, 0.88, 0.9, 0.92, 0.94, 0.96, 0.98, 1], "inferredType": "NUMBER"}, "y1": {"type": "NUMBER", "values": [-1, -0.999476987447699, -0.998932764140875, -0.998366013071895, -0.997775305895439, -0.997159090909091, -0.996515679442509, -0.9958432304038, -0.995139732685298, -0.994402985074627, -0.993630573248407, -0.992819843342037, -0.991967871485944, -0.991071428571429, -0.990126939351199, -0.989130434782609, -0.988077496274217, -0.986963190184049, -0.985781990521327, -0.984527687296417, -0.983193277310924, -0.981770833333333, -0.980251346499102, -0.978624535315985, -0.976878612716763, -0.975, -0.972972972972973, -0.970779220779221, -0.968397291196388, -0.965801886792453, -0.962962962962963, -0.959844559585492, -0.956403269754768, -0.952586206896552, -0.948328267477204, -0.943548387096774, -0.938144329896907, -0.931985294117647, -0.924901185770751, -0.916666666666667, -0.906976744186046, -0.895408163265306, -0.88135593220339, -0.863924050632911, -0.841726618705036, -0.8125, -0.772277227722772, -0.713414634146342, -0.61904761904762, -0.443181818181819, 0, 0.443181818181819, 0.61904761904762, 0.713414634146342, 0.772277227722773, 0.8125, 0.841726618705036, 0.863924050632912, 0.88135593220339, 0.895408163265306, 0.906976744186046, 0.916666666666667, 0.924901185770751, 0.931985294117647, 0.938144329896907, 0.943548387096774, 0.948328267477204, 0.952586206896552, 0.956403269754768, 0.959844559585492, 0.962962962962963, 0.965801886792453, 0.968397291196388, 0.970779220779221, 0.972972972972973, 0.975, 0.976878612716763, 0.978624535315985, 0.980251346499102, 0.981770833333333, 0.983193277310924, 0.984527687296417, 0.985781990521327, 0.986963190184049, 0.988077496274217, 0.989130434782609, 0.990126939351199, 0.991071428571429, 0.991967871485944, 0.992819843342037, 0.993630573248407, 0.994402985074627, 0.995139732685298, 0.9958432304038, 0.996515679442509, 0.997159090909091, 0.997775305895439, 0.998366013071895, 0.998932764140875, 0.999476987447699, 1], "inferredType": "NUMBER"}, "y2": {"type": "NUMBER", "values": [-1, -0.556818181818181, -0.38095238095238, -0.286585365853658, -0.227722772277228, -0.1875, -0.158273381294964, -0.136075949367088, -0.11864406779661, -0.104591836734694, -0.0930232558139534, -0.0833333333333332, -0.0750988142292489, -0.0680147058823528, -0.0618556701030927, -0.0564516129032257, -0.0516717325227962, -0.0474137931034482, -0.0435967302452315, -0.0401554404145077, -0.0370370370370369, -0.0341981132075471, -0.0316027088036116, -0.0292207792207791, -0.027027027027027, -0.025, -0.023121387283237, -0.0213754646840148, -0.0197486535008976, -0.0182291666666666, -0.0168067226890756, -0.015472312703583, -0.014218009478673, -0.0130368098159509, -0.0119225037257824, -0.0108695652173913, -0.0098730606488011, -0.00892857142857142, -0.00803212851405621, -0.00718015665796343, -0.00636942675159234, -0.00559701492537312, -0.0048602673147023, -0.00415676959619951, -0.00348432055749128, -0.00284090909090909, -0.00222469410456062, -0.00163398692810457, -0.00106723585912487, -0.000523012552301256, 0, 0.000523012552301256, 0.00106723585912487, 0.00163398692810457, 0.00222469410456062, 0.00284090909090909, 0.00348432055749128, 0.00415676959619953, 0.0048602673147023, 0.00559701492537312, 0.00636942675159234, 0.00718015665796343, 0.00803212851405621, 0.00892857142857142, 0.0098730606488011, 0.0108695652173913, 0.0119225037257824, 0.0130368098159509, 0.014218009478673, 0.015472312703583, 0.0168067226890756, 0.0182291666666666, 0.0197486535008976, 0.0213754646840148, 0.023121387283237, 0.025, 0.027027027027027, 0.0292207792207791, 0.0316027088036116, 0.0341981132075471, 0.0370370370370369, 0.0401554404145077, 0.0435967302452315, 0.0474137931034482, 0.0516717325227962, 0.0564516129032257, 0.0618556701030927, 0.0680147058823528, 0.0750988142292489, 0.0833333333333332, 0.0930232558139534, 0.104591836734694, 0.11864406779661, 0.136075949367088, 0.158273381294964, 0.1875, 0.227722772277227, 0.286585365853658, 0.38095238095238, 0.556818181818181, 1], "inferredType": "NUMBER"}}', '2020-07-22 18:21:16.067', 2, 'Tunable Sigmoid', 1, 'https://gist.githubusercontent.com/frysztak/7fc996f4412f0f242efc47bcd86d6c08/raw/90ea59dc18cbcc0aadc14c0209a44519a04a7932/normalised_sigmoid.csv', '2020-07-22 18:21:16.068');
INSERT INTO public."DataFrame" (columns, "createdAt", id, name, "projectId", source, "updatedAt") VALUES ('{"age": {"type": "NUMBER", "values": [55, 76, 24, 33, 18, 27, 48], "inferredType": "NUMBER"}, "sales": {"type": "NUMBER", "values": [150, 200, 400, 50, 100, 250, 100], "inferredType": "NUMBER"}, "last_name": {"type": "STRING", "values": ["Smith", "Fahey", "Wątroba", "Oyvey", "Sowa", "Gonera", "Trojanicci"], "inferredType": "STRING"}, "first_name": {"type": "STRING", "values": ["John", "Jacek", "Suzanne", "Hildegard", "Michał", "Anna", "Remek"], "inferredType": "STRING"}}', '2020-07-22 18:38:50.545', 3, 'Sales', 1, 'https://gist.githubusercontent.com/frysztak/31d45ef9404ef8b124fcfab2859ea27b/raw/8b044820cc1c0256e77ab96f3f3fb638a8fb197a/sales.csv', '2020-07-22 18:38:50.546');
INSERT INTO public."DataFrame" (columns, "createdAt", id, name, "projectId", source, "updatedAt") VALUES ('{"x": {"type": "NUMBER", "values": [0, 0.02, 0.04, 0.06, 0.08, 0.1, 0.12, 0.14, 0.16, 0.18, 0.2, 0.22, 0.24, 0.26, 0.28, 0.3, 0.32, 0.34, 0.36, 0.38, 0.4, 0.42, 0.44, 0.46, 0.48, 0.5, 0.52, 0.54, 0.56, 0.58, 0.6, 0.62, 0.64, 0.66, 0.68, 0.7, 0.72, 0.74, 0.76, 0.78, 0.8, 0.82, 0.84, 0.86, 0.88, 0.9, 0.92, 0.94, 0.96, 0.98, 1, 1.02, 1.04, 1.06, 1.08, 1.1, 1.12, 1.14, 1.16, 1.18, 1.2, 1.22, 1.24, 1.26, 1.28, 1.3, 1.32, 1.34, 1.36, 1.38, 1.4, 1.42, 1.44, 1.46, 1.48, 1.5, 1.52, 1.54, 1.56, 1.58, 1.6, 1.62, 1.64, 1.66, 1.68, 1.7, 1.72, 1.74, 1.76, 1.78, 1.8, 1.82, 1.84, 1.86, 1.88, 1.9, 1.92, 1.94, 1.96, 1.98, 2, 2.02, 2.04, 2.06, 2.08, 2.1, 2.12, 2.14, 2.16, 2.18, 2.2, 2.22, 2.24, 2.26, 2.28, 2.3, 2.32, 2.34, 2.36, 2.38, 2.4, 2.42, 2.44, 2.46, 2.48, 2.5, 2.52, 2.54, 2.56, 2.58, 2.6, 2.62, 2.64, 2.66, 2.68, 2.7, 2.72, 2.74, 2.76, 2.78, 2.8, 2.82, 2.84, 2.86, 2.88, 2.9, 2.92, 2.94, 2.96, 2.98, 3, 3.02, 3.04, 3.06, 3.08, 3.1, 3.12, 3.14, 3.16, 3.18, 3.2, 3.22, 3.24, 3.26, 3.28, 3.3, 3.32, 3.34, 3.36, 3.38, 3.4, 3.42, 3.44, 3.46, 3.48, 3.5, 3.52, 3.54, 3.56, 3.58, 3.6, 3.62, 3.64, 3.66, 3.68, 3.7, 3.72, 3.74, 3.76, 3.78, 3.8, 3.82, 3.84, 3.86, 3.88, 3.9, 3.92, 3.94, 3.96, 3.98, 4, 4.02, 4.04, 4.06, 4.08, 4.1, 4.12, 4.14, 4.16, 4.18, 4.2, 4.22, 4.24, 4.26, 4.28, 4.3, 4.32, 4.34, 4.36, 4.38, 4.4, 4.42, 4.44, 4.46, 4.48, 4.5, 4.52, 4.54, 4.56, 4.58, 4.6, 4.62, 4.64, 4.66, 4.68, 4.7, 4.72, 4.74, 4.76, 4.78, 4.8, 4.82, 4.84, 4.86, 4.88, 4.9, 4.92, 4.94, 4.96, 4.98, 5], "inferredType": "NUMBER"}, "y_overdamped": {"type": "NUMBER", "values": [2, 2.13164432737387, 2.24751582886298, 2.34893908472158, 2.43713462071211, 2.51322695207288, 2.57825200816736, 2.63316398544758, 2.67884167270191, 2.71609428917644, 2.74566687303824, 2.76824525476765, 2.78446064740743, 2.79489388314149, 2.80007932340951, 2.80050846767198, 2.79663328400887, 2.78886928295238, 2.77759835430879, 2.76317138520514, 2.74591067619423, 2.72611217095705, 2.70404751394656, 2.67996594921387, 2.65409607263965, 2.62664744885333, 2.59781210325522, 2.56776589875576, 2.53666980610632, 2.50467107601393, 2.47190432060189, 2.43849251119678, 2.40454789888534, 2.37017286378934, 2.33546069854874, 2.30049633108139, 2.26535699129746, 2.23011282608699, 2.19482746656695, 2.15955855126704, 2.12435820865101, 2.08927350210847, 2.05434684031118, 2.01961635560516, 1.98511625290423, 1.95087713136112, 1.91692628091689, 1.88328795566791, 1.84998362584029, 1.81703221002389, 1.78445028919101, 1.75225230390728, 1.72045073603395, 1.68905627612095, 1.65807797759736, 1.62752339878119, 1.5973987336512, 1.56770893225124, 1.53845781153041, 1.50964815736034, 1.48128181841395, 1.45335979253734, 1.4258823061975, 1.39884888754398, 1.37225843358095, 1.34610927190778, 1.32039921745115, 1.29512562457888, 1.27028543495556, 1.24587522147251, 1.22189122855858, 1.198329409155, 1.17518545861528, 1.15245484577136, 1.1301328413882, 1.10821454421215, 1.08669490480231, 1.06556874731969, 1.04483078943529, 1.02447566050573, 1.00449791815376, 0.9848920633801, 0.965652554323419, 0.946773818776093, 0.928250265555176, 0.910076294820139, 0.892246307421942, 0.874754713361362, 0.857595939428478, 0.840764436089605, 0.824254683682803, 0.808061197978325, 0.792178535155988, 0.776601296247349, 0.761324131086883, 0.746341741812853, 0.731648885955406, 0.717240379146458, 0.70311109748326, 0.689255979574979, 0.675670028299356, 0.662348312294353, 0.649285967207737, 0.63647819672574, 0.623920273400235, 0.611607539292373, 0.59953540644913, 0.587699357227975, 0.576094944483585, 0.564717791629484, 0.553563592586383, 0.542628111628105, 0.531907183135061, 0.521396711264462, 0.51109266954568, 0.500991100408507, 0.491088114651413, 0.481379890856316, 0.47186267475586, 0.462532778558665, 0.45338658023759, 0.444420522785607, 0.435631113443501, 0.427014922903251, 0.418568584490625, 0.410288793330207, 0.402172305495797, 0.394215937148875, 0.386416563667574, 0.378771118768387, 0.371276593622644, 0.363930035969599, 0.356728549227795, 0.349669291606229, 0.342749475216693, 0.335966365188515, 0.329317278786844, 0.322799584535453, 0.316410701344998, 0.310148097647515, 0.304009290537893, 0.297991844922961, 0.292093372678765, 0.286311531816528, 0.280644025657751, 0.275088602018827, 0.269643052405515, 0.264305211217551, 0.259072954963658, 0.253944201487142, 0.24891690920226, 0.243989076341488, 0.239158740213807, 0.234423976474078, 0.229782898403569, 0.225233656201666, 0.220774436288784, 0.21640346062047, 0.21211898601268, 0.207919303478194, 0.203802737574115, 0.1997676457604, 0.195812417769335, 0.191935474985891, 0.188135269838847, 0.184410285202607, 0.180759033809584, 0.177180057673044, 0.173671927520308, 0.170233242236164, 0.166862628316391, 0.163558739331241, 0.160320255398771, 0.157145882667864, 0.154034352810832, 0.150984422525435, 0.147994873046201, 0.145064509664885, 0.142192161259949, 0.139376679834899, 0.136616940065355, 0.133911838854707, 0.131260294898216, 0.128661248255418, 0.126113659930696, 0.123616511461883, 0.121168804516746, 0.118769560497232, 0.116417820151328, 0.114112643192406, 0.111853107925916, 0.109638310883307, 0.107467366463028, 0.1053394065785, 0.103253580312917, 0.101209053580763, 0.099205008795911, 0.097240644546191, 0.095315175274306, 0.093427830964966, 0.091577856838147, 0.089764513048336, 0.087987074389667, 0.08624483000682, 0.0845370831116, 0.082863150705056, 0.081222363305058, 0.079614064679223, 0.078037611583079, 0.076492373503377, 0.074977732406448, 0.073493082491507, 0.072037829948808, 0.070611392722567, 0.069213200278537, 0.067842693376175, 0.06649932384529, 0.065182554367093, 0.063891858259559, 0.062626719267031, 0.061386631353962, 0.060171098502735, 0.058979634515461, 0.057811762819702, 0.056667016278017, 0.055544937001272, 0.054445076165643, 0.053366993833217, 0.052310258776155, 0.051274448304315, 0.050259148096286, 0.049263952033761, 0.048288462039182, 0.047332287916593, 0.046395047195643, 0.045476364978666, 0.044575873790792, 0.043693213433014, 0.042828030838167, 0.041979979929753, 0.041148721483555, 0.040333922991991, 0.039535258531152, 0.038752408630469, 0.037985060144955, 0.037232906129982, 0.036495645718527, 0.035772984000854, 0.035064631906569, 0.034370306089018, 0.033689728811967], "inferredType": "NUMBER"}, "y_underdamped": {"type": "NUMBER", "values": [2, 2.17647296727979, 2.34578880516697, 2.50780429703937, 2.66239134771896, 2.80943689961526, 2.94884282522289, 3.08052579662233, 3.20441713265891, 3.32046262449919, 3.42862234028642, 3.52887040963783, 3.62119478874531, 3.70559700685917, 3.78209189494999, 3.85070729735828, 3.91148376725398, 3.96447424673884, 4.00974373243426, 4.04736892740468, 4.07743788027279, 4.10004961238775, 4.11531373391007, 4.12335004967904, 4.12428815572804, 4.11826702731207, 4.10543459930882, 4.08594733985049, 4.05996981803775, 4.02767426658078, 3.98924014020354, 3.94485367063865, 3.89470741902897, 3.83899982654068, 3.77793476397949, 3.71172108118759, 3.64057215698412, 3.56470545039566, 3.4843420539065, 3.39970624944047, 3.31102506776752, 3.21852785200868, 3.12244582589275, 3.02301166739733, 2.92045908838494, 2.81502242082304, 2.70693621015386, 2.59643481635683, 2.48375202322258, 2.36912065633352, 2.25277221022138, 2.13493648514763, 2.01584123392731, 1.89571181919178, 1.77477088146056, 1.65323801836674, 1.53132947535493, 1.40925784814517, 1.28723179723038, 1.16545577464973, 1.04412976325447, 0.923449028657847, 0.803603884035107, 0.684779467915222, 0.567155535080859, 0.450906260668987, 0.336200057540395, 0.223199406962728, 0.112060702628336, 0.002934108005416, -0.104036573001536, -0.208714012127826, -0.310967459628521, -0.410672834050411, -0.507712799004489, -0.601976827067128, -0.693361250957294, -0.781769302155636, -0.867111137149104, -0.949303851501983, -1.0282714819707, -1.10394499689562, -1.17626227511807, -1.24516807368538, -1.3106139846202, -1.37255838104351, -1.43096635295262, -1.48580963296732, -1.53706651236754, -1.58472174775626, -1.62876645869022, -1.66919801662972, -1.70601992556609, -1.73924169469267, -1.76887870349108, -1.79495205960999, -1.81748844991828, -1.83651998511843, -1.85208403830915, -1.86422307788872, -1.87298449519234, -1.87842042725774, -1.88058757511393, -1.87954701798741, -1.87536402381937, -1.86810785648584, -1.85785158011049, -1.84467186085694, -1.82864876658407, -1.8098655647438, -1.78840851889623, -1.76436668421202, -1.7378317023261, -1.70889759590092, -1.6776605632506, -1.64421877337047, -1.6086721617089, -1.57112222701036, -1.53167182955046, -1.49042499107491, -1.44748669674537, -1.40296269938563, -1.35695932631225, -1.30958328902327, -1.26094149600889, -1.21114086893722, -1.16028816245757, -1.10848978785301, -1.05585164076266, -1.00247893318307, -0.94847602994666, -0.893946289863824, -0.838991911703588, -0.783713785176295, -0.728211347069989, -0.672582442680596, -0.616923192664231, -0.561327865428373, -0.505888755166961, -0.45069606563291, -0.395837799730034, -0.341399654994952, -0.287464925028224, -0.234114406922822, -0.181426314726931, -0.129476198967245, -0.078336872248192, -0.028078340931953, 0.02123225710612, 0.069530708662272, 0.116755775354722, 0.162849237774736, 0.207755933682913, 0.251423790304286, 0.29380385078477, 0.334850294880025, 0.374520453956137, 0.412774820389499, 0.449577051460981, 0.484893967846847, 0.51869554681597, 0.550954910249586, 0.5816483076063, 0.610755093961078, 0.638257703252741, 0.664141616879843, 0.688395327789917, 0.711010300211722, 0.731980925184573, 0.75130447204278, 0.768981036016955, 0.785013482117258, 0.799407385466632, 0.812170968254748, 0.823315033485653, 0.832852895694129, 0.84080030880736, 0.847175391329849, 0.851998549030481, 0.855292395311309, 0.857081669437977, 0.857393152811723, 0.856255583462652, 0.853699568943394, 0.849757497801417, 0.844463449807104, 0.837853105113332, 0.829963652520556, 0.820833697019508, 0.810503166781406, 0.799013219763125, 0.786406150092143, 0.772725294393154, 0.758014938215142, 0.742320222714413, 0.725687051745538, 0.708161999508496, 0.689792218896419, 0.670625350684307, 0.650709433694885, 0.630092816073419, 0.608824067798874, 0.58695189455414, 0.564525053073365, 0.541592268079623, 0.518202150921182, 0.494403120009688, 0.470243323158468, 0.445770561914006, 0.4210322179685, 0.396075181736091, 0.370945783170153, 0.345689724893663, 0.32035201770941, 0.294976918551422, 0.269607870933713, 0.244287447947099, 0.219057297849576, 0.193958092290443, 0.169029477203186, 0.144310026396876, 0.119837197870792, 0.09564729287182, 0.071775417709256, 0.04825544833664, 0.02511999770547, 0.002400385890806, -0.019873387015801, -0.041672665255275, -0.062970159005487, -0.083739963259236, -0.103957573997944, -0.123599901687411, -0.14264528212593, -0.161073484678942, -0.178865717938121, -0.196004632846362, -0.212474323333602, -0.228260324511672, -0.243349608479578, -0.257730577793566, -0.271393056659215, -0.28432827990547, -0.296528879803121, -0.307988870792549, -0.318703632187893, -0.328669888926761, -0.337885690436626, -0.346350387690733, -0.354064608528003, -0.361030231312816], "inferredType": "NUMBER"}}', '2020-07-22 19:55:27.044', 4, 'Spring Motion', 1, 'https://gist.githubusercontent.com/frysztak/27883ba8d5c35404b43598383cf34c71/raw/e6554bc04306ce504945bc6caace283f22632d83/spring_motion.csv', '2020-07-22 19:55:27.045');


--
-- TOC entry 2946 (class 0 OID 16403)
-- Dependencies: 206
-- Data for Name: Project; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Project" ("createdAt", id, name, "updatedAt") VALUES ('2020-07-15 20:40:00.158', 1, 'Sample Project', '2020-07-22 21:29:49.872');


--
-- TOC entry 2948 (class 0 OID 16412)
-- Dependencies: 208
-- Data for Name: _Migration; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."_Migration" (revision, name, datamodel, status, applied, rolled_back, datamodel_steps, database_migration, errors, started_at, finished_at) VALUES (1, '20200713211916-init-db', 'datasource db {
  provider = "postgresql"
  url      = "***"
}

model DataFrame {
  id        Int      @default(autoincrement()) @id
  source    String
  name      String
  columns   Json
  project   Project  @relation(fields: [projectId], references: [id])
  projectId Int
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Chart {
  id        Int      @default(autoincrement()) @id
  name      String
  columns   Json
  props     Json
  project   Project  @relation(fields: [projectId], references: [id])
  projectId Int
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Project {
  id        Int         @default(autoincrement()) @id
  name      String
  charts    Chart[]
  dataFrame DataFrame[]
  createdAt DateTime    @default(now())
  updatedAt DateTime    @updatedAt
}', 'MigrationSuccess', 4, 0, '[{"tag":"CreateSource","source":"db"},{"tag":"CreateArgument","location":{"tag":"Source","source":"db"},"argument":"provider","value":"\"postgresql\""},{"tag":"CreateArgument","location":{"tag":"Source","source":"db"},"argument":"url","value":"\"***\""},{"tag":"CreateModel","model":"DataFrame"},{"tag":"CreateField","model":"DataFrame","field":"id","type":"Int","arity":"Required"},{"tag":"CreateDirective","location":{"path":{"tag":"Field","model":"DataFrame","field":"id"},"directive":"default"}},{"tag":"CreateArgument","location":{"tag":"Directive","path":{"tag":"Field","model":"DataFrame","field":"id"},"directive":"default"},"argument":"","value":"autoincrement()"},{"tag":"CreateDirective","location":{"path":{"tag":"Field","model":"DataFrame","field":"id"},"directive":"id"}},{"tag":"CreateField","model":"DataFrame","field":"source","type":"String","arity":"Required"},{"tag":"CreateField","model":"DataFrame","field":"name","type":"String","arity":"Required"},{"tag":"CreateField","model":"DataFrame","field":"columns","type":"Json","arity":"Required"},{"tag":"CreateField","model":"DataFrame","field":"project","type":"Project","arity":"Required"},{"tag":"CreateDirective","location":{"path":{"tag":"Field","model":"DataFrame","field":"project"},"directive":"relation"}},{"tag":"CreateArgument","location":{"tag":"Directive","path":{"tag":"Field","model":"DataFrame","field":"project"},"directive":"relation"},"argument":"fields","value":"[projectId]"},{"tag":"CreateArgument","location":{"tag":"Directive","path":{"tag":"Field","model":"DataFrame","field":"project"},"directive":"relation"},"argument":"references","value":"[id]"},{"tag":"CreateField","model":"DataFrame","field":"projectId","type":"Int","arity":"Required"},{"tag":"CreateField","model":"DataFrame","field":"createdAt","type":"DateTime","arity":"Required"},{"tag":"CreateDirective","location":{"path":{"tag":"Field","model":"DataFrame","field":"createdAt"},"directive":"default"}},{"tag":"CreateArgument","location":{"tag":"Directive","path":{"tag":"Field","model":"DataFrame","field":"createdAt"},"directive":"default"},"argument":"","value":"now()"},{"tag":"CreateField","model":"DataFrame","field":"updatedAt","type":"DateTime","arity":"Required"},{"tag":"CreateDirective","location":{"path":{"tag":"Field","model":"DataFrame","field":"updatedAt"},"directive":"updatedAt"}},{"tag":"CreateModel","model":"Chart"},{"tag":"CreateField","model":"Chart","field":"id","type":"Int","arity":"Required"},{"tag":"CreateDirective","location":{"path":{"tag":"Field","model":"Chart","field":"id"},"directive":"default"}},{"tag":"CreateArgument","location":{"tag":"Directive","path":{"tag":"Field","model":"Chart","field":"id"},"directive":"default"},"argument":"","value":"autoincrement()"},{"tag":"CreateDirective","location":{"path":{"tag":"Field","model":"Chart","field":"id"},"directive":"id"}},{"tag":"CreateField","model":"Chart","field":"name","type":"String","arity":"Required"},{"tag":"CreateField","model":"Chart","field":"columns","type":"Json","arity":"Required"},{"tag":"CreateField","model":"Chart","field":"props","type":"Json","arity":"Required"},{"tag":"CreateField","model":"Chart","field":"project","type":"Project","arity":"Required"},{"tag":"CreateDirective","location":{"path":{"tag":"Field","model":"Chart","field":"project"},"directive":"relation"}},{"tag":"CreateArgument","location":{"tag":"Directive","path":{"tag":"Field","model":"Chart","field":"project"},"directive":"relation"},"argument":"fields","value":"[projectId]"},{"tag":"CreateArgument","location":{"tag":"Directive","path":{"tag":"Field","model":"Chart","field":"project"},"directive":"relation"},"argument":"references","value":"[id]"},{"tag":"CreateField","model":"Chart","field":"projectId","type":"Int","arity":"Required"},{"tag":"CreateField","model":"Chart","field":"createdAt","type":"DateTime","arity":"Required"},{"tag":"CreateDirective","location":{"path":{"tag":"Field","model":"Chart","field":"createdAt"},"directive":"default"}},{"tag":"CreateArgument","location":{"tag":"Directive","path":{"tag":"Field","model":"Chart","field":"createdAt"},"directive":"default"},"argument":"","value":"now()"},{"tag":"CreateField","model":"Chart","field":"updatedAt","type":"DateTime","arity":"Required"},{"tag":"CreateDirective","location":{"path":{"tag":"Field","model":"Chart","field":"updatedAt"},"directive":"updatedAt"}},{"tag":"CreateModel","model":"Project"},{"tag":"CreateField","model":"Project","field":"id","type":"Int","arity":"Required"},{"tag":"CreateDirective","location":{"path":{"tag":"Field","model":"Project","field":"id"},"directive":"default"}},{"tag":"CreateArgument","location":{"tag":"Directive","path":{"tag":"Field","model":"Project","field":"id"},"directive":"default"},"argument":"","value":"autoincrement()"},{"tag":"CreateDirective","location":{"path":{"tag":"Field","model":"Project","field":"id"},"directive":"id"}},{"tag":"CreateField","model":"Project","field":"name","type":"String","arity":"Required"},{"tag":"CreateField","model":"Project","field":"charts","type":"Chart","arity":"List"},{"tag":"CreateField","model":"Project","field":"dataFrame","type":"DataFrame","arity":"List"},{"tag":"CreateField","model":"Project","field":"createdAt","type":"DateTime","arity":"Required"},{"tag":"CreateDirective","location":{"path":{"tag":"Field","model":"Project","field":"createdAt"},"directive":"default"}},{"tag":"CreateArgument","location":{"tag":"Directive","path":{"tag":"Field","model":"Project","field":"createdAt"},"directive":"default"},"argument":"","value":"now()"},{"tag":"CreateField","model":"Project","field":"updatedAt","type":"DateTime","arity":"Required"},{"tag":"CreateDirective","location":{"path":{"tag":"Field","model":"Project","field":"updatedAt"},"directive":"updatedAt"}}]', '{"before":{"tables":[{"name":"_Migration","columns":[{"name":"applied","tpe":{"dataType":"integer","fullDataType":"int4","characterMaximumLength":null,"family":"int","arity":"required"},"default":null,"autoIncrement":false},{"name":"database_migration","tpe":{"dataType":"text","fullDataType":"text","characterMaximumLength":null,"family":"string","arity":"required"},"default":null,"autoIncrement":false},{"name":"datamodel","tpe":{"dataType":"text","fullDataType":"text","characterMaximumLength":null,"family":"string","arity":"required"},"default":null,"autoIncrement":false},{"name":"datamodel_steps","tpe":{"dataType":"text","fullDataType":"text","characterMaximumLength":null,"family":"string","arity":"required"},"default":null,"autoIncrement":false},{"name":"errors","tpe":{"dataType":"text","fullDataType":"text","characterMaximumLength":null,"family":"string","arity":"required"},"default":null,"autoIncrement":false},{"name":"finished_at","tpe":{"dataType":"timestamp without time zone","fullDataType":"timestamp","characterMaximumLength":null,"family":"dateTime","arity":"nullable"},"default":null,"autoIncrement":false},{"name":"name","tpe":{"dataType":"text","fullDataType":"text","characterMaximumLength":null,"family":"string","arity":"required"},"default":null,"autoIncrement":false},{"name":"revision","tpe":{"dataType":"integer","fullDataType":"int4","characterMaximumLength":null,"family":"int","arity":"required"},"default":{"SEQUENCE":"nextval(''\"_Migration_revision_seq\"''::regclass)"},"autoIncrement":true},{"name":"rolled_back","tpe":{"dataType":"integer","fullDataType":"int4","characterMaximumLength":null,"family":"int","arity":"required"},"default":null,"autoIncrement":false},{"name":"started_at","tpe":{"dataType":"timestamp without time zone","fullDataType":"timestamp","characterMaximumLength":null,"family":"dateTime","arity":"required"},"default":null,"autoIncrement":false},{"name":"status","tpe":{"dataType":"text","fullDataType":"text","characterMaximumLength":null,"family":"string","arity":"required"},"default":null,"autoIncrement":false}],"indices":[],"primaryKey":{"columns":["revision"],"sequence":{"name":"_Migration_revision_seq","initialValue":1,"allocationSize":1}},"foreignKeys":[]}],"enums":[],"sequences":[{"name":"_Migration_revision_seq","initialValue":1,"allocationSize":1}]},"after":{"tables":[{"name":"DataFrame","columns":[{"name":"columns","tpe":{"dataType":"","fullDataType":"","characterMaximumLength":null,"family":"json","arity":"required"},"default":null,"autoIncrement":false},{"name":"createdAt","tpe":{"dataType":"","fullDataType":"","characterMaximumLength":null,"family":"dateTime","arity":"required"},"default":"NOW","autoIncrement":false},{"name":"id","tpe":{"dataType":"","fullDataType":"","characterMaximumLength":null,"family":"int","arity":"required"},"default":null,"autoIncrement":true},{"name":"name","tpe":{"dataType":"","fullDataType":"","characterMaximumLength":null,"family":"string","arity":"required"},"default":null,"autoIncrement":false},{"name":"projectId","tpe":{"dataType":"","fullDataType":"","characterMaximumLength":null,"family":"int","arity":"required"},"default":null,"autoIncrement":false},{"name":"source","tpe":{"dataType":"","fullDataType":"","characterMaximumLength":null,"family":"string","arity":"required"},"default":null,"autoIncrement":false},{"name":"updatedAt","tpe":{"dataType":"","fullDataType":"","characterMaximumLength":null,"family":"dateTime","arity":"required"},"default":null,"autoIncrement":false}],"indices":[],"primaryKey":{"columns":["id"],"sequence":null},"foreignKeys":[{"constraintName":null,"columns":["projectId"],"referencedTable":"Project","referencedColumns":["id"],"onDeleteAction":"cascade"}]},{"name":"Chart","columns":[{"name":"columns","tpe":{"dataType":"","fullDataType":"","characterMaximumLength":null,"family":"json","arity":"required"},"default":null,"autoIncrement":false},{"name":"createdAt","tpe":{"dataType":"","fullDataType":"","characterMaximumLength":null,"family":"dateTime","arity":"required"},"default":"NOW","autoIncrement":false},{"name":"id","tpe":{"dataType":"","fullDataType":"","characterMaximumLength":null,"family":"
int","arity":"required"},"default":null,"autoIncrement":true},{"name":"name","tpe":{"dataType":"","fullDataType":"","characterMaximumLength":null,"family":"string","arity":"required"},"default":null,"autoIncrement":false},{"name":"projectId","tpe":{"dataType":"","fullDataType":"","characterMaximumLength":null,"family":"int","arity":"required"},"default":null,"autoIncrement":false},{"name":"props","tpe":{"dataType":"","fullDataType":"","characterMaximumLength":null,"family":"json","arity":"required"},"default":null,"autoIncrement":false},{"name":"updatedAt","tpe":{"dataType":"","fullDataType":"","characterMaximumLength":null,"family":"dateTime","arity":"required"},"default":null,"autoIncrement":false}],"indices":[],"primaryKey":{"columns":["id"],"sequence":null},"foreignKeys":[{"constraintName":null,"columns":["projectId"],"referencedTable":"Project","referencedColumns":["id"],"onDeleteAction":"cascade"}]},{"name":"Project","columns":[{"name":"createdAt","tpe":{"dataType":"","fullDataType":"","characterMaximumLength":null,"family":"dateTime","arity":"required"},"default":"NOW","autoIncrement":false},{"name":"id","tpe":{"dataType":"","fullDataType":"","characterMaximumLength":null,"family":"int","arity":"required"},"default":null,"autoIncrement":true},{"name":"name","tpe":{"dataType":"","fullDataType":"","characterMaximumLength":null,"family":"string","arity":"required"},"default":null,"autoIncrement":false},{"name":"updatedAt","tpe":{"dataType":"","fullDataType":"","characterMaximumLength":null,"family":"dateTime","arity":"required"},"default":null,"autoIncrement":false}],"indices":[],"primaryKey":{"columns":["id"],"sequence":null},"foreignKeys":[]}],"enums":[],"sequences":[]},"original_steps":[{"CreateTable":{"table":{"name":"DataFrame","columns":[{"name":"columns","tpe":{"dataType":"","fullDataType":"","characterMaximumLength":null,"family":"json","arity":"required"},"default":null,"autoIncrement":false},{"name":"createdAt","tpe":{"dataType":"","fullDataType":"","characterMaximumLength":null,"family":"dateTime","arity":"required"},"default":"NOW","autoIncrement":false},{"name":"id","tpe":{"dataType":"","fullDataType":"","characterMaximumLength":null,"family":"int","arity":"required"},"default":null,"autoIncrement":true},{"name":"name","tpe":{"dataType":"","fullDataType":"","characterMaximumLength":null,"family":"string","arity":"required"},"default":null,"autoIncrement":false},{"name":"projectId","tpe":{"dataType":"","fullDataType":"","characterMaximumLength":null,"family":"int","arity":"required"},"default":null,"autoIncrement":false},{"name":"source","tpe":{"dataType":"","fullDataType":"","characterMaximumLength":null,"family":"string","arity":"required"},"default":null,"autoIncrement":false},{"name":"updatedAt","tpe":{"dataType":"","fullDataType":"","characterMaximumLength":null,"family":"dateTime","arity":"required"},"default":null,"autoIncrement":false}],"indices":[],"primaryKey":{"columns":["id"],"sequence":null},"foreignKeys":[{"constraintName":null,"columns":["projectId"],"referencedTable":"Project","referencedColumns":["id"],"onDeleteAction":"cascade"}]}}},{"CreateTable":{"table":{"name":"Chart","columns":[{"name":"columns","tpe":{"dataType":"","fullDataType":"","characterMaximumLength":null,"family":"json","arity":"required"},"default":null,"autoIncrement":false},{"name":"createdAt","tpe":{"dataType":"","fullDataType":"","characterMaximumLength":null,"family":"dateTime","arity":"required"},"default":"NOW","autoIncrement":false},{"name":"id","tpe":{"dataType":"","fullDataType":"","characterMaximumLength":null,"family":"int","arity":"required"},"default":null,"autoIncrement":true},{"name":"name","tpe":{"dataType":"","fullDataType":"","characterMaximumLength":null,"family":"string","arity":"required"},"default":null,"autoIncrement":false},{"name":"projectId","tpe":{"dataType":"","fullDataType":"","characterMaximumLength":null,"family":"int","arity":"required"},"default":null,"autoIncrement":false},{"name":"props","tpe":{"dataType":"","fullDataType":"","characterMaximumLength":null,"family":"json","arity":"required"},"default":null,"autoIncrement":false},{"name":"updatedAt","tpe":{"dataType":"","fullDataType":"","characterMaximumLength":null,"family":"dateTime","arity":"required"},"default":null,"autoIncrement":false}],"indices":[],"primaryKey":{"columns":["id"],"sequence":null},"foreignKeys":[{"constraintName":null,"columns":["projectId"],"referencedTable":"Project","referencedColumns":["id"],"onDeleteAction":"cascade"}]}}},{"CreateTable":{"table":{"name":"Project","columns":[{"name":"createdAt","tpe":{"dataType":"","fullDataType":"","characterMaximumLength":null,"family":"dateTime","arity":"required"},"default":"NOW","autoIncrement":false},{"name":"id","tpe":{"dataType":"","fullDataType":"","characterMaximumLength":null,"family":"int","arity":"required"},"default":null,"autoIncrement":true},{"name":"name","tpe":{"dataType":"","fullDataType":"","characterMaximumLength":null,"family":"string","arity":"required"},"default":null,"autoIncrement":false},{"name":"updatedAt","tpe":{"dataType":"","fullDataType":"","characterMaximumLength":null,"family":"dateTime","arity":"required"},"default":null,"autoIncrement":false}],"indices":[],"primaryKey":{"columns":["id"],"sequence":null},"foreignKeys":[]}}},{"AddForeignKey":{"table":"DataFrame","foreign_key":{"constraintName":null,"columns":["projectId"],"referencedTable":"Project","referencedColumns":["id"],"onDeleteAction":"cascade"}}},{"AddForeignKey":{"table":"Chart","foreign_key":{"constraintName":null,"columns":["projectId"],"referencedTable":"Project","referencedColumns":["id"],"onDeleteAction":"cascade"}}}],"corrected_steps":[{"CreateTable":{"table":{"name":"DataFrame","columns":[{"name":"columns","tpe":{"dataType":"","fullDataType":"","characterMaximumLength":null,"family":"json","arity":"required"},"default":null,"autoIncrement":false},{"name":"createdAt","tpe":{"dataType":"","fullDataType":"","characterMaximumLength":null,"family":"dateTime","arity":"required"},"default":"NOW","autoIncrement":false},{"name":"id","tpe":{"dataType":"","fullDataType":"","characterMaximumLength":null,"family":"int","arity":"required"},"default":null,"autoIncrement":true},{"name":"name","tpe":{"dataType":"","fullDataType":"","characterMaximumLength":null,"family":"string","arity":"required"},"default":null,"autoIncrement":false},{"name":"projectId","tpe":{"dataType":"","fullDataType":"","characterMaximumLength":null,"family":"int","arity":"required"},"default":null,"autoIncrement":false},{"name":"source","tpe":{"dataType":"","fullDataType":"","characterMaximumLength":null,"family":"string","arity":"required"},"default":null,"autoIncrement":false},{"name":"updatedAt","tpe":{"dataType":"","fullDataType":"","characterMaximumLength":null,"family":"dateTime","arity":"required"},"default":null,"autoIncrement":false}],"indices":[],"primaryKey":{"columns":["id"],"sequence":null},"foreignKeys":[{"constraintName":null,"columns":["projectId"],"referencedTable":"Project","referencedColumns":["id"],"onDeleteAction":"cascade"}]}}},{"CreateTable":{"table":{"name":"Chart","columns":[{"name":"columns","tpe":{"dataType":"","fullDataType":"","characterMaximumLength":null,"family":"json","arity":"required"},"default":null,"autoIncrement":false},{"name":"createdAt","tpe":{"dataType":"","fullDataType":"","characterMaximumLength":null,"family":"dateTime","arity":"required"},"default":"NOW","autoIncrement":false},{"name":"id","tpe":{"dataType":"","fullDataType":"","characterMaximumLength":null,"family":"int","arity":"required"},"default":null,"autoIncrement":true},{"name":"name","tpe":{"dataType":"","fullDataType":"","characterMaximumLength":null,"family":"string","arity":"required"},"default":null,"autoIncrement":false},{"name":"projectId","tpe":{"dataType":"","fullDataType":"","characterMaximumLength":null,"family":"int","arity":"required"},"default":null,"autoIncrement":false},{"name":"props","tpe":{"dataType":"","fullDataType":"","characterMaximumLength":null,"family":"json","arity":"required"},"default":null,"autoIncrement":false},{"name":"updatedAt","tpe":{"dataType":"","fullDataType":"","characterMaximumLength":null,"family":"dateTime","arity":"required"},"default":null,"autoIncrement":false}],"indices":[],"primaryKey":{"columns":["id"],"sequence":null},"foreignKeys":[{"constraintName":null,"columns":["projectId"],"referencedTable":"Project","referencedColumns":["id"],"onDeleteAction":"cascade"}]}}},{"CreateTable":{"table":{"name":"Project","columns":[{"name":"createdAt","tpe":{"dataType":"","fullDataType":"","characterMaximumLength":null,"family":"dateTime","arity":"required"},"default":"NOW","autoIncrement":false},{"name":"id","tpe":{"dataType":"","fullDataType":"","characterMaximumLength":null,"family":"int","arity":"required"},"default":null,"autoIncrement":true},{"name":"name","tpe":{"dataType":"","fullDataType":"","characterMaximumLength":null,"family":"string","arity":"required"},"default":null,"autoIncrement":false},{"name":"updatedAt","tpe":{"dataType":"","fullDataType":"","characterMaximumLength":null,"family":"dateTime","arity":"required"},"default":null,"autoIncrement":false}],"indices":[],"primaryKey":{"columns":["id"],"sequence":null},"foreignKeys":[]}}},{"AddForeignKey":{"table":"DataFrame","foreign_key":{"constraintName":null,"columns":["projectId"],"referencedTable":"Project","referencedColumns":["id"],"onDeleteAction":"cascade"}}},{"AddForeignKey":{"table":"Chart","foreign_key":{"constraintName":null,"columns":["projectId"],"referencedTable":"Project","referencedColumns":["id"],"onDeleteAction":"cascade"}}}],"rollback":[{"DropTable":{"name":"DataFrame"}},{"DropTable":{"name":"Chart"}},{"DropTable":{"name":"Project"}}]}', '[]', '2020-07-13 19:19:45.842', '2020-07-13 19:19:46.966');


--
-- TOC entry 2960 (class 0 OID 0)
-- Dependencies: 203
-- Name: Chart_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Chart_id_seq"', 6, true);


--
-- TOC entry 2961 (class 0 OID 0)
-- Dependencies: 205
-- Name: DataFrame_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."DataFrame_id_seq"', 4, true);


--
-- TOC entry 2962 (class 0 OID 0)
-- Dependencies: 207
-- Name: Project_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Project_id_seq"', 1, true);


--
-- TOC entry 2963 (class 0 OID 0)
-- Dependencies: 209
-- Name: _Migration_revision_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."_Migration_revision_seq"', 1, true);


--
-- TOC entry 2807 (class 2606 OID 16428)
-- Name: Chart Chart_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Chart"
    ADD CONSTRAINT "Chart_pkey" PRIMARY KEY (id);


--
-- TOC entry 2809 (class 2606 OID 16430)
-- Name: DataFrame DataFrame_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DataFrame"
    ADD CONSTRAINT "DataFrame_pkey" PRIMARY KEY (id);


--
-- TOC entry 2811 (class 2606 OID 16432)
-- Name: Project Project_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Project"
    ADD CONSTRAINT "Project_pkey" PRIMARY KEY (id);


--
-- TOC entry 2813 (class 2606 OID 16434)
-- Name: _Migration _Migration_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_Migration"
    ADD CONSTRAINT "_Migration_pkey" PRIMARY KEY (revision);


--
-- TOC entry 2814 (class 2606 OID 16435)
-- Name: Chart Chart_projectId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Chart"
    ADD CONSTRAINT "Chart_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES public."Project"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2815 (class 2606 OID 16440)
-- Name: DataFrame DataFrame_projectId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DataFrame"
    ADD CONSTRAINT "DataFrame_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES public."Project"(id) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2020-07-22 23:40:00 CEST

--
-- PostgreSQL database dump complete
--

